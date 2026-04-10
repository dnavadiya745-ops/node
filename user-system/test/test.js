const autocannon = require("autocannon");
const url = "http://localhost:3000/"; // Routes
const duration = "10"; // 10 sec

const instance = autocannon({
    url,
    duration
},(err,result)=>{
    if (err) {
        console.log("server test fail : ", err)
    } else {
        console.log("server test result :");
        console.log(result)
    }

});

autocannon.track(instance);
