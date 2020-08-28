$(function() {
    //登录功能
    $(".submit").click(async function() {
        let account = $(".userName").val().trim();
        let password = $(".userPass").val().trim();

        if (account === "" || password === "") {
            return alert("账号密码不能为空~");
        }
        //md5密码加密
        password = md5(password);
        // console.log(account, password);

        // axios.post("/user/login", {
        //     account,
        //     password
        // }).then(res => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err);
        // })
        let res = await axios.post("/user/login", { account, password });

        if (parseInt(res.code) === 0) {
            alert('登陆成功');
            window.location.href = "index.html"
            return;
        }
        alert('用户名密码错误！')
    })
})