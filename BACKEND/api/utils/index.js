const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {

        // Generate random number 
        var j = Math.floor(Math.random() * (i + 1));

        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

const cloudinaryUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ERA_910");
    formData.append("cloud_name", "eracloud");
    const res = await fetch("https://api.cloudinary.com/v1_1/eracloud/image/upload", {
        method: "POST",
        body: formData
    });
    const data = await res.json();
    console.log(data);
    return data;
}

module.exports = { shuffleArray, cloudinaryUpload }