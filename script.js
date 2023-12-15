$(document).ready(function () {
    // Gửi yêu cầu đến API khi trang được tải
    $.ajax({
        url: 'https://657b3de2394ca9e4af140ab0.mockapi.io/api/vebays', 
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            displayFlights(data);
        },
        error: function (error) {
            console.error('Error fetching data from API:', error);
        }
    });
    $(document).on('click', '.flight-item button', function () {
        // Lấy đường dẫn từ thuộc tính href của nút
        const thanhtoanUrl = $(this).attr('href');

        // Chuyển hướng sang trang thanhtoan.html
        window.location.href = thanhtoanUrl;
    });
});

$(function() {
    $(".datepicker").datepicker({
        dateFormat: "dd/mm/yy"
    });
});

function searchFlights() {
    // Lấy dữ liệu từ các trường nhập
    const noidi = $('#from').val();
    const noiden = $('#to').val();
    const gia = $('#price').val();

    // Gọi API để lấy dữ liệu chuyến bay
    $.ajax({
        url: 'https://657b3de2394ca9e4af140ab0.mockapi.io/api/vebays?noidi=' + noidi,
        method: 'GET',
        success: function (response) {
            const flightsData = response;
            displayFlights(flightsData);
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
}
$.ajax({
    url: 'https://657b3de2394ca9e4af140ab0.mockapi.io/api/vebays?noiden=' + noiden, 
    method: 'GET',
    success: function (response) {
        const flightsData = response;
        displayFlights(flightsData);
    },
    error: function (error) {
        console.log('Error:', error);
    }
});
function displayFlights(flights) {
    const flightList = $('#flightList');

    // Xóa dữ liệu cũ
    flightList.empty();

    // Hiển thị dữ liệu mới
    flights.forEach(flight => {
        const flightItem = `<li class="flight-item">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Vietnam_Airlines_Boeing_787-9_VN-A869_SGN_10022017.jpg/1200px-Vietnam_Airlines_Boeing_787-9_VN-A869_SGN_10022017.jpg" alt="Vietnam Airlines">
                                <p>Nơi đi: ${flight.noidi}</p>
                                <p>Nơi đến: ${flight.noiden}</p>
                                <p>Ngày đi: ${flight.ngaydi}</p>
                                <p>Hãng hàng không: ${flight.hang}</p>
                                <p>Giá: ${flight.gia}</p>
                                <button href="thanhtoan.html">Đặt Ngay</button>
                             </li>`;
        flightList.append(flightItem);
    });
}
