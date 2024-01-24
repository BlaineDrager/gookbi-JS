const loading = document.getElementById('loading'); // 로딩을 숨기기 위해 구현 // 오류 Cannot set properties of null (setting 'hide') loading 이 null 이라고 알려주는것 이런 상황이 발생하면 html 의 script 태그에 defer 를 추가해주자

const requestForm = document.getElementById('requestForm'); 
const table = document.getElementById('table');

loading.hide = function () {
    this.classList.remove('visible');
}

loading.show = function () {
    this.classList.add('visible');
}

requestForm.onsubmit = function (e) {
    e.preventDefault(); // 새창 및 새로고침 방지
    const xhr = new XMLHttpRequest();
    // const formData = new FormData(); // GET 방식일 땐 필요가 없음
    xhr.onreadystatechange = function () {
        if(xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        loading.hide(); // 로딩이 DONE 즉 끝이 나면 숨기게 만듬 // 이 부분이 현재 요청을 보내고 난 이후
        if (xhr.status < 200 || xhr.status >= 300) {
            alert('데이터를 불러오지 못했습니다. 잠시후 다시 시도해 주세요');
            return;
        }
        const response = JSON.parse(xhr.responseText); // 네트워크 응답의 오브젝트를
        const items = response['response']['body']['items']['item'];
        const tbody = table.querySelector(':scope > tbody');
        tbody.innerHTML = ''; // tbody 비우기
        let i = 0;
        for (const item of items) {
            const tr = new DOMParser().parseFromString(
                `<table>    
                    <tr>
                        <th>${items[i]['basDt']}</th>
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
                </table>`,'text/html'
            ).querySelector('tr');
            tbody.append(tr);
            i++;
        }
        //basDt srtnCd isinCd mrktCtg itmsNm crno corpNm
    }
    xhr.open('GET', `https://apis.data.go.kr/1160100/service/GetKrxListedInfoService/getItemInfo?serviceKey=DaQnNyeclwZRFyM87WzCsOPaQRGbsnPepO9oC%2BWnRaHnIlnaEs1%2BiWpywAWSgIgOWT6zOPep4acAwWbssYnsBw%3D%3D&numOfRows=${requestForm['numOfRows'].value}&resultType=json`);
    xhr.send();
    loading.show(); // 이 부분이 과거 즉 먼저 요청을 보내는 것
}