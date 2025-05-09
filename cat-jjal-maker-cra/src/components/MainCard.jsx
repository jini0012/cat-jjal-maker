const MainCard = ({ img, onHeartClick, alreadyFavorite, onDeleteClick }) => {
  const heartIcon = alreadyFavorite ? "💖" : "🤍";

  return (
    <div className="main-card">
      <img src={img} alt="고양이" width="400" />
      <button onClick={onDeleteClick} className="deleteBtn">
        {"🗑️"}
      </button>
      <button
        onClick={onHeartClick}
        disabled={alreadyFavorite}
        className="heartBtn"
      >
        {heartIcon}
      </button>
    </div>
  );
};
export default MainCard;
