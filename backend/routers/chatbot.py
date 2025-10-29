# routers/chatbot.py
from fastapi import APIRouter
from typing import Dict
import asyncio
import subprocess
import sys
import os

router = APIRouter()

# Variáveis globais compartilhadas com o bot
# Essas devem ser importadas do seu bot se estiverem no mesmo arquivo ou módulo
# Aqui apenas um placeholder para exemplo
is_authenticated = False
current_qr = None

# Endpoint para verificar status do bot
@router.get("/status")
async def get_bot_status() -> Dict[str, str]:
    """
    Retorna o status de autenticação do bot e o QR code se ainda não autenticado.
    """
    return {
        "authenticated": is_authenticated,
        "qr": current_qr
    }

# Endpoint para reautenticar o bot
@router.post("/reauth")
async def reauth_bot() -> Dict[str, str]:
    """
    Força o bot a gerar um novo QR code e reinicia a autenticação.
    """
    # Para simplicidade, vamos reiniciar o processo do bot
    # Se você tiver o bot rodando em um thread ou como background task,
    # adapte para reiniciar essa função diretamente

    # Exemplo: matar processo antigo e iniciar novo
    # Aqui assumimos que você tem um arquivo bot.js ou bot.ts
    bot_file = os.path.join(os.getcwd(), "bot.js")  # ou bot.ts

    # Inicia o bot em subprocesso separado
    subprocess.Popen([sys.executable, bot_file], shell=True)

    return {
        "message": "Bot reiniciado, novo QR code disponível."
    }
