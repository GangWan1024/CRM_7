$(function() {
    let checkList = null;

    //部门显示
    initDepartMent();
    async function initDepartMent() {
        let result = await queryDepart();
        if (result.code == 0) {
            let str = ``;
            result.data.forEach(item => {
                str += `<option value="${item.id}">${item.name}</option>`
            });
            $(".selectBox").html(str);
        }
    };
    //展示员工列表
    showUserList();
    async function showUserList() {
        //封装两个条件参数
        let params = {
            departmentId: $('.selectBox').val(),
            search: $('.searchInp').val().trim(),
        }
        let result = await axios.get("/user/list", { params });
        // console.log(result);
        if (result.code !== 0) return;
        let str = ``;
        result.data.forEach(item => {
            let {
                id,
                name,
                sex,
                email,
                phone,
                department,
                job,
                desc
            } = item;
            str += `<tr>
            <td class="w3"><input type="checkbox" userId="${id}"></td>
            <td class="w10">${name}</td>
            <td class="w5">${sex==0?'男':'女'}</td>
            <td class="w10">${department}</td>
            <td class="w10">${job}</td>
            <td class="w15">${email}</td>
            <td class="w15">${phone}</td>
            <td class="w20">${desc}</td>
            <td class="w12" userId="${id}">
                <a href="javascript:;">编辑</a>
                <a href="javascript:;">删除</a>
                <a href="javascript:;">重置密码</a>
            </td>
        </tr>`;
            $("tbody").html(str);

            //  拿到tbody中所有的小选择框
            checkList = $("tbody").find('input[type="checkbox"]')
        })

    };

    //根据条件显示员工列表
    searchHandle();

    function searchHandle() {
        $(".selectBox").change(showUserList);
        $(".searchInp").on("keydown", e => {
            if (e.keyCode === 13) { //回车
                showUserList();
            }
        })
    };
    delegate();

    //编辑 删除 重置密码
    function delegate() {
        $("tbody").on("click", "a", async e => {
            // console.log(e);
            let target = e.target,
                tag = target.tagName,
                text = target.innerHTML.trim();
            if (tag === "A") {
                let userId = $(target).parent().attr("userId");
                if (text === "编辑") {
                    window.location.href = `useradd.html?id=${userId}`
                    return;
                }
                if (text === "删除") {
                    let flag = confirm("你确定要删除吗？");
                    if (!flag) return;
                    let result = await axios.get("/user/delete", {
                        params: { userId }
                    })
                    if (result.code === 0) {
                        alert("删除用户信息~");
                        $(target).parent().parent().remove();
                        checkList = $("tbody").find('input[type="checkbox"]')
                    }
                    return;
                }
                if (text === "重置密码") {
                    let flag = confirm("你确定要重置此用户的密码吗？");
                    if (!flag) return;
                    let result = await axios.post("/user/resetpassword", {
                        userId
                    })
                    if (result.code === 0) {
                        alert("重置密码成功");
                        return;
                    }
                    return;
                }
            }
        })
    }

    //全选处理
    selectHandle();

    function selectHandle() {
        //全选控制小选
        $("#checkAll").click(e => {
            //拿到全选checked的值true或false
            let checked = $("#checkAll").prop("checked");
            // console.log(checked);
            //
            checkList.prop("checked", checked);
        });
        //小选控制全选
        $("tbody").on("click", "input", e => {
            if (e.target.tagName === "INPUT") {
                let flag = true;
                // console.log(checkList);
                newCheckList = Array.from(checkList);
                // console.log(newCheckList);
                newCheckList.forEach(item => {
                    if (!$(item).prop("checked")) {
                        flag = false;
                    }
                })
                $("#checkAll").prop("checked", flag);
            }
        });
    }
    //实现批量删除
    $(".deleteAll").click(e => {
        let arr = [];
        [].forEach.call(checkList, item => {
            if ($(item).prop("checked")) {
                console.log($(item));
                arr.push($(item).attr("userid"))
            }
        })
        if (arr.length === 0) {
            alert("你需要先选中一些用户~");
            return;
        }
        let flag = confirm("你确定要删除这些用户吗？");
        if (!flag) return;

        let index = -1;

        async function deleteUser() {
            let userId = arr[++index];
            if (index >= arr.length) {
                alert("已成功删除员工");
                showUserList();
                return;
            }
            let result = await axios.get("/user/delete", {
                params: {
                    userId
                }
            })
            if (result.code != 0) {
                //删除失败
                return;
            }
            //递归 函数内部调函数
            deleteUser();
        }
        deleteUser();
    })
})