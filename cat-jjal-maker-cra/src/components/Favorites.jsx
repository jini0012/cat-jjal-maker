import CatItems from './CatItems';

function Favorites({ favorites }) {
    if (favorites.length === 0) {
        return <p>사진 위 하트를 눌러 고양이 사진을 저장해봐요!</p>;
    }

    return (
        <ul className="favorites">
            {favorites.map((cat, index) => (
                <CatItems img={cat} key={index} />
            ))}
        </ul>
    );
}
export default Favorites;
