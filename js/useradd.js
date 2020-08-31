$(function() {
    initDeptAndJob();

    async function initDeptAndJob() {
        let departmentDate = await queryDepart();
        let jobData = await queryJob();
        // console.log(departmentDate);
        // console.log(jobData);
        if (departmentDate.code === 0) {
            departmentDate = departmentDate.data;
            let str = ``;
            departmentDate.forEach(item => {
                str += `<option value="${item.id}">${item.name}</option>`;
            });
            $(".userdepartment").html(str);
        };
        if (jobData.code === 0) {
            jobData = jobData.data;
            let str = ``;
            jobData.forEach(item => {
                str += `<option value="${item.id}">${item.name}</option>`;
            });
            $(".userjob").html(str);
        }
    };

    function checkname() {
        let val = $(".username").val().trim();
        if (val.length === 0) {
            $(".spanusername").html("此为必填项~");
            return false;
        }
        if (!/^[\u4e00-\u9fa5]{2,10}/.test(val)) {
            $(".spanusername").html("名字必须是2~10个汉字");
            return false;
        }
        $(".spanusername").html("姓名ok~");
        return true;
    };

    function checkemail() {
        let val = $(".useremail").val().trim();
        if (val.length === 0) {
            $(".spanuseremail").html("此为必填项~");
            return false;
        }
        if (!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(val)) {
            $(".spanuseremail").html("请填写正确邮箱~");
            return false;
        }
        $(".spanuseremail").html("");
        return true;
    };

    function checkphone() {
        let val = $(".userphone").val().trim();
        if (val.length === 0) {
            $(".spanuserphone").html("此为必填项~");
            return false;
        }
        if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(val)) {
            $(".spanuserphone").html("请填写正确手机号~");
            return false;
        }
        $(".spanuserphone").html("");
        return true;
    };

    $(".submit").click(async function() {
        if (!checkname() || !checkemail() || !checkphone()) {
            alert("你填写的数据不合法");
            return;
        };
        //校验通过 获取用户输入信息
        let params = {
            name: $(".username").val().trim(),
            //prop() 方法设置或返回被选元素的属性和值。
            //这里返回checked的值，值为0或1
            sex: $("#man").prop("checked") ? 0 : 1,
            email: $(".useremail").val().trim(),
            phone: $(".userphone").val().trim(),
            departmentId: $(".userdepartment").val(),
            jobId: $(".userjob").val(),
            desc: $(".userdesc").val().trim(),
        };
        // console.log(params);
        //实现新增
        let result = await axios.post("/user/add", params)
        if (result.code === 0) {
            alert("添加员工成功~");
            window.location.href = "userlist.html";
            return;
        }
    });

    //失去焦点时对数据进行校验
    $(".username").blur(function() {
        let val = $(".username").val().trim();
        if (val.length === 0) {
            $(".spanusername").html("此为必填项~");
            return;
        }
        if (!/^[\u4e00-\u9fa5]{2,10}/.test(val)) {
            $(".spanusername").html("名字必须是2~10个汉字");
            return;
        }
        $(".spanusername").html("姓名ok~");
        return;
    });
    $(".useremail").blur(function() {
        let val = $(".useremail").val().trim();
        if (val.length === 0) {
            $(".spanuseremail").html("此为必填项~");
            return;
        }
        if (!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(val)) {
            $(".spanuseremail").html("请填写正确邮箱~");
            return;
        }
        $(".spanuseremail").html("");
        return;
    });
    $(".userphone").blur(function() {
        let val = $(".userphone").val().trim();
        if (val.length === 0) {
            $(".spanuserphone").html("此为必填项~");
            return;
        }
        if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(val)) {
            $(".spanuserphone").html("请填写正确手机号~");
            return;
        }
        $(".spanuserphone").html("");
        return;
    });
})