const loading = document.getElementById('loading'); // 로딩을 숨기기 위해 구현
// 오류 Cannot set properties of null (setting 'hide') loading 이 null 이라고 알려주는것 이런 상황이 발생하면 html 의 script 태그에 defer 를 추가해주자

const requestForm = document.getElementById('requestForm');  // id 가 requestForm 인 태그를 가지고 옴
const table = document.getElementById('table');

loading.hide = function () {
    this.classList.remove('visible'); // 클래스 제거
}

loading.show = function () {
    this.classList.add('visible'); // 클래스 추가
}

requestForm.onsubmit = function (e) {
    e.preventDefault(); // 이벤트의 속성 중 하나로 새 창 및 새로고침 방지한다
    const xhr = new XMLHttpRequest();
    // const formData = new FormData(); // GET 방식일 땐 필요가 없음
    xhr.onreadystatechange = function () {
        if(xhr.readyState !== XMLHttpRequest.DONE) { // 로딩이 DONE 이 아닌경우는 아무것도 하지않고 return 을 한다
            return;
        }
        loading.hide(); // 로딩이 DONE 즉 끝이 나면 숨기게 만듬 // 이 부분이 현재 요청을 보내고 난 이후
        if (xhr.status < 200 || xhr.status >= 300) { // status 의 값이 200 미만이거나 300 이상인 경우
            alert('데이터를 불러오지 못했습니다. 잠시후 다시 시도해 주세요');
            return;
        }
        const response = JSON.parse(xhr.responseText); // 네트워크 응답에 있는 오브젝트의 문자열들을 객체로 변환 시켜줌
        const items = response['response']['body']['items']['item']; // 응답을 잘 보면 첫 시작 키가 response 임 을 알수 있음으로 response 부터 시작하자
        const tbody = table.querySelector(':scope > tbody'); // 테이블의 자식인 tbody를 잡아 상수 선언
        tbody.innerHTML = ''; // tbody 비우기
        let i = 0;
        for (const item of items) {
            const tr = new DOMParser().parseFromString( // DOMParser().parseFromString 를 통해 문자열인 아래의 태그들을 객체로 변환시킴
                `<table>    
                    <tr>
                        <th>${items[i]['basDt']}</th><!--i 를 for문 밖에 배치를 하고 아래에 i++ 을 통해 +1 을 넣어줌으로 써 해당 배열에 들어있는 키 basDt의 값 을 나타나개 했다-->
                        <td>${items[i]['srtnCd']}</td>
                        <td>${items[i]['isinCd']}</td>
                        <td>${items[i]['mrktCtg']}</td>
                        <td>${items[i]['itmsNm']}</td>
                        <td>${items[i]['crno']}</td>
                        <td>${items[i]['corpNm']}</td>
                        <td>
                            <a href="#" class="item">네이버 주식</a>
                        </td>
                    </tr>
                </table>`,'text/html' // 텍스트의 변환 형식을 지정하는 것으로 html 로 변환시키는 역할을 해줌
            ).querySelector('tr'); // 해당 인자내에서 tr 을 찾는다
            tbody.append(tr); // tbody에 tr을 추가
            i++; // 응답에 존재하는 유일한 배열을 바꾸기 위해 i 에 ++ 를 추가
        }

        //basDt srtnCd isinCd mrktCtg itmsNm crno corpNm
    }
    xhr.open('GET', `https://apis.data.go.kr/1160100/service/GetKrxListedInfoService/getItemInfo?serviceKey=DaQnNyeclwZRFyM87WzCsOPaQRGbsnPepO9oC%2BWnRaHnIlnaEs1%2BiWpywAWSgIgOWT6zOPep4acAwWbssYnsBw%3D%3D&numOfRows=${requestForm['numOfRows'].value}&resultType=json`); // GET 방식 //
    xhr.send(); // send 이후에 위의 xhr.onreadystatechange 가 돌아가는 형식이다.
    loading.show(); // 이 부분이 과거 즉 먼저 요청을 보내는 것
}