const Card = ({ title, value, color }) => {
  return (
    <div
      className={`text-white rounded-2xl shadow-lg p-6 transition-transform hover:scale-105`}
      style={{ backgroundColor: color }}
    >
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <p className="text-lg">{value}</p>
    </div>
  );
};

export default Card;
