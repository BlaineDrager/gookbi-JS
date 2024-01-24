const addressFinder = document.getElementById('addressFinder');
const registerForm = document.getElementById('registerForm')
addressFinder.hide = function () {
    this.classList.remove('visible');
}

addressFinder.show = function () {
    new daum.Postcode({ // 인식이 안된다면 html 에 있는 주소를 주소창에 넣어 다운로드 하고 파일을 가져오면 된다
        width : '100%', // 삐져나갔을 경우에 넣어주면 된다.
        height : '100%',
        oncomplete: function(data) { // 검색 결과에서 주소를 선택하는 순간 // data 사용자가 선택 한 주소
            console.log(data);
            registerForm['addressPostal'].value = data['zonecode']; // 우편번호 삽입 data가 오브젝트이기에 오브젝트 안의 내용을 잘 보고 선택해 오면된다
            registerForm['addressPrimary'].value = data['address']; // 기본주소 삽입
            registerForm['addressSecondary'].focus(); // 삽입이 끝나고 focus 잡기
            addressFinder.hide();
        }
    }).embed(addressFinder.querySelector(':scope > .dialog'));
    this.classList.add('visible'); // 클래스 추가
}

registerForm['addressFind'] // name 이 addressFind 인녀석을 찾음 >> 우편번호 찾기 버튼 을 잡아줌
    .onclick = function () {
    addressFinder.show();
}

addressFinder.querySelector(':scope > .close').onclick = function () {
    addressFinder.hide();
} // [] :  name 찾기 querySelector : 클래스 찾기 document.getElementById : 아이디 찾기

// 다음 주소 api 받아오기

