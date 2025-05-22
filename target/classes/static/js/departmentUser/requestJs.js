
function showModal(){
$('#publicModal').modal('show');
}

function print(dataType, callback) {
    // Ensure callback is a function
    if (typeof callback !== 'function') {
        console.error('Callback is not a function');
        return;
    }

    $.ajax({
        url: '/superAdmin/allData',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            // Execute the callback with the requested dataType
            callback(data[dataType]);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}

function columnValue(requestId, columnName, callback) {
    print('requestData', function(allAddData) {
        const deviceData = allAddData.find(item => item.id === requestId);

        if (deviceData) {
            const columnData = deviceData.allData;

            if (columnData && columnData.hasOwnProperty(columnName)) {
                callback(columnData[columnName]);
            } else {
                console.warn(`Column "${columnName}" not found in request data.`);
                callback(undefined);
            }
        } else {
            console.warn(`No data found for Device ID ${requestId}`);
            callback(undefined);
        }
    });
}