import { useState } from 'react';

const Form = ({ updateMainCat }) => {
    const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function handleInputChange(e) {
        const userValue = e.target.value;
        setErrorMessage('');
        if (includesHangul(userValue)) {
            setErrorMessage('한글은 입력할 수 없습니다.');
        }
        setValue(userValue.toUpperCase());
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        setErrorMessage('');

        if (value === '' || value === ' ') {
            setErrorMessage('빈 값으로 만들 수 없습니다.');
            // return;
        }

        updateMainCat(value);
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                onChange={handleInputChange}
                type="text"
                name="name"
                placeholder="영어 대사를 입력해주세요"
                value={value}
            />
            <button type="submit" disabled={errorMessage}>
                생성
            </button>
            <p style={{ color: 'red' }}>{errorMessage}</p>
        </form>
    );
};

export default Form;
