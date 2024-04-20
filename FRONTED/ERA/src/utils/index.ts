export const getDateFromMongoData = (mongoDateData: string) => {
    const monthsObject = {
        "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec",
    }

    const newDate = mongoDateData.split('T')[0].split("-");
    const month = monthsObject[newDate[1]];
    const finalDate = `${month} ${newDate[0]}`

    return finalDate;
}

export const shuffleArray = (array: any) => {
    for (var i = array.length - 1; i > 0; i--) {

        // Generate random number 
        var j = Math.floor(Math.random() * (i + 1));

        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}