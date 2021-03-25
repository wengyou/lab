const menuConfig = [
    {
        title: "用户管理",
        key: "/admin/userManage",
        icon: "user",
        children: [
            {
                title: "管理员信息",
                key:"/admin/userManage/administratorInformation",
            },
            {
                title: "教师信息",
                key: "/admin/userManage/teacherInformation",
            },
            {
                title: "学生信息",
                key: "/admin/userManage/studentInformation",
            },
            {
                title: "注册用户",
                key: "/admin/userManage/registerUser"
            }
        ]
    },
    {
        title: "实验课程管理",
        key: "/admin/courseManage",
        icon: "read",
        children: [
            {
                title: "实验课程",
                key:"/admin/courseManage/labCourse",
            },
            {
                title: "教师课程",
                key: "/admin/courseManage/teacherCourse",
            },
            {
                title: "学生课程",
                key: "/admin/courseManage/studentCourse",
            }
        ]
    },
    {
        title: "资料管理",
        key: "/admin/informationManage",
        icon: "file",
        children: [
            {
                title: "学习资料",
                key:"/admin/informationManage/studyInformation",
            },
            {
                title: "学习软件",
                key: "/admin/informationManage/studySoftware",
            },
        ]
    },
    {
        title: "实验室管理",
        key: "/admin/labManage",
        icon: "code",
        children: [
            {
                title: "实验室公告",
                key:"/admin/labManage/labAnnounce",
            },
        ]
    },
    {
        title: "数据信息管理",
        type: "data",
        key: "/admin/dataInformationManage",
        icon: "inbox",
    },

];
export default menuConfig;