//用户管理
//游客部分
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOG_OUT = "LOG_OUT";
export const KEEP_ALIVE = "KEEP_ALIVE";
export const REGISTER = "REGISTER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const QUERY_RESOURCE = "QUERY_RESOURCE";
export const TEACHERRES = "TEACHERRES";
export const HANDLE_TEACHERRES_SUCCESS = "HANDLE_TEACHERRES_SUCCESS";
//密码部分
export const QUERY_SECRET = "QUERY_SECRET";
export const QUERY_SECRET_SUCCESS = 'QUERY_SECRET_SUCCESS';
export const RESET_PASSWARD = 'RESET_PASSWARD'
export const CHECK_QUESTION = 'CHECK_QUESTION';
export const CHECK_QUESTION_SUCCESS = 'CHECK_QUESTION_SUCCESS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTION_SUCCESS = 'ADD_QUESTION_SUCCESS'
//密保
export const SECRET_GUARD_EXISTENCE = 'SECRET_GUARD_EXISTENCE';
export const SECRET_GUARD_EXISTENCE_SUCCESS = 'SECRET_GUARD_EXISTENCE_SUCCESS'
//学生部分
export const QUERY_HOMEWORK = "QUERY_HOMEWORK";
export const QUERY_HOMEWORK_OK = "QUERY_HOMEWORK_OK";
//学生添加课程
//资源管理
export const CHANGE_TYPE = "CHANGE_TYPE";
export const FETCH_STUDY_RESOURCE = "FETCH_STUDY_RESOURCE";
export const FETCH_STUDY_RES_SUCCESS = "FETCH_STUDY_RES_SUCCESS";
export const FETCH_SOFTWARE_RES_SUCCESS = "FETCH_SOFTWARE_RES_SUCCESS";
export const FETCH_SOFTWARE_RESOURCE = "FETCH_SOFTWARE_RESOURCE";
//学习资源下载次数
export const DOWNLOAD_RESOURCE = "DOWNLOAD_RESOURCE";
export const DOWNLOAD_RESOURCE_SUCCESS = "DOWNLOAD_RESOURCE_SUCCESS";
//软件资源下载
export const DOWNLOAD_SOFTWARE = "DOWNLOAD_SOFTWARE";
export const DOWNLOAD_SOFTWARE_SUCCESS = "DOWNLOAD_SOFTWARE_SUCCESS";
//上传
export const FETCH_UPLOAD_RES = "FETCH_UPLOAD_RES";
export const FETCH_UPLOAD_DATA_SUCCESS = "FETCH_UPLOAD_DATA_SUCCESS";
export const FETCH_UPLOAD_SOFTWARE_SUCCESS = "FETCH_UPLOAD_SOFTWARE_SUCCESS";
export const NOT_UPLOAD = "NOT_UPLOAD";
//获取老师资源
export const FETCH_TEACHER_DATA = "FETCH_TEACHER_DATA";
export const FETCH_TEACHER_DATA_SUCCESS = "FETCH_TEACHER_DATA_SUCCESS";
export const FETCH_TEACHER_SOFTWARE = "FETCH_TEACHER_SOFTWARE";
export const FETCH_TEACHER_SOFTWARE_SUCCESS = "FETCH_TEACHER_SOFTWARE_SUCCESS";
//老师查询学生信息
export const FETCH_STUDENT_MESSAGE = "FETCH_STUDENT_MESSAGE";
export const FETCH_STUDENT_MESSAGE_SUCCESS = "FETCH_STUDENT_MESSAGE_SUCCESS";
//老师批准注册用户
export const REGISTERED = "REGISTERED";
export const REGISTERED_SUCCESS = "REGISTERED_SUCCESS";
//老师查询待批准的学生
export const FETCH_QUERY_REGISTER = "FETCH_QUERY_REGISTER";
export const FETCH_QUERY_REGISTER_SUCCESS = "FETCH_QUERY_REGISTER_SUCCESS";
//删除学习资源
export const DELETE_DATA = "DELETE_DATA";
export const DELETE_DATA_SUCCESS = "DELETE_DATA_SUCCESS";
//删除软件资源
export const DELETE_SOFTWARE = "DELETE_SOFTWARE";
export const DELETE_SOFTWARE_SUCCESS = "DELETE_SOFTWARE_SUCCESS";
//搜索资源
export const FETCH_SEARCH_VALUE = "FETCH_SEARCH_VALUE";
export const FETCH_SEARCH_VALUE_SUCCESS = "FETCH_SEARCH_VALUE_SUCCESS";
export const FETCH_SEARCH_DATA_SUCCESS = "FETCH_SEARCH_DATA_SUCCESS";
export const FETCH_SEARCH_SOFTWARE_SUCCESS = "FETCH_SEARCH_SOFTWARE_SUCCESS";
//下载资源
export const MATERIAL_LOAD = "MATERIAL_LOAD";
export const FETCH_LOAD_RESOURCE_SUCCESS = "FETCH_LOAD_RESOURCE_SUCCESS";
//实验室公告
export const QUERY_ANNOUNCE = "QUERY_ANNOUNCE";
export const QUERY_ANNOUNCE_SUCCESS = "QUERY_ANNOUNCE_SUCCESS";
//上机任务
export const QUERY_COURSE = "QUERY_COURSE";
export const QUERY_COURSE_RES_SUCCESS = "QUERY_COURSE_RES_SUCCESS";
export const QUERY_COURSE_TASK = "QUERY_COURSE_TASK";
export const QUERY_COURSE_TASK_SUCCESS = "QUERY_COURSE_TASK_SUCCESS";
//修改学生信息
export const PRESERVE = "PRESERVE";
export const PRESERVE_SUCCESS = "PRESERVE_SUCCESS";
//教师查询课程
export const FETCH_SEARCH_COURSE = "FETCH_SEARCH_COURSE";
export const FETCH_SEARCH_COURSE_SUCCESS = "FETCH_SEARCH_COURSE_SUCCESS";


//超级管理员
export const FETCH_ADMINSIDE = "FETCH_ADMINSIDE";
//获取管理员信息
export const FETCH_ADMINISTRATOR_DATA = "FETCH_ADMINISTRATOR_DATA";
export const FETCH_ADMINISTRATOR_DATA_SUCCESS = "FETCH_ADMINISTRATOR_DATA_SUCCESS";
//添加新的管理员
export const ADD_NEW_ADMIN = "ADD_NEW_ADMIN";
export const ADD_NEW_ADMIN_SUCCESS = "ADD_NEW_ADMIN_SUCCESS";
//修改管理员信息
export const MODIFY_ADMIN = "MODIFY_ADMIN";
export const MODIFY_ADMIN_SUCCESS = "MODIFY_ADMIN_SUCCESS";
//获取老师信息
export const FETCH_TEACHER_RES = "FETCH_TEACHER_RES";
export const FETCH_TEACHER_RES_SUCCESS = "FETCH_TEACHER_RES_SUCCESS";
//添加新的教师
export const ADD_NEW_TEACHER = "ADD_NEW_TEACHER";
export const ADD_NEW_TEACHER_SUCCESS = "ADD_NEW_TEACHER_SUCCESS";
//搜索老师
export const SEARCH_TEACHER = "SEARCH_TEACHER";
export const SEARCH_TEACHER_SUCCESS = "SEARCH_TEACHER_SUCCESS";
//删除教师
export const DELETE_TEACHER = "DELETE_TEACHER";
export const DELETE_TEACHER_SUCCESS = "DELETE_TEACHER_SUCCESS";
//修改教师信息
export const MODIFY_TEACHER = "MODIFY_TEACHER";
export const MODIFY_TEACHER_SUCCESS = "MODIFY_TEACHER_SUCCESS";
//获取学生信息
export const FETCH_STUDENT_DATA = "FETCH_STUDENT_DATA";
export const FETCH_STUDENT_DATA_SUCCESS = "FETCH_STUDENT_DATA_SUCCESS";
//添加学生
export const ADD_NEW_STUDENT = "ADD_NEW_STUDENT";
export const ADD_NEW_STUDENT_SUCCESS = "ADD_NEW_STUDENT_SUCCESS";
//删除学生
export const DELETE_STUDENT = "DELETE_STUDENT";
export const DELETE_STUDENT_SUCCESS = "DELETE_STUDENT_SUCCESS";
//修改学生
export const MODIFY_STUDENT = "MODIFY_STUDENT";
export const MODIFY_STUDENT_SUCCESS = "MODIFY_STUDENT_SUCCESS";
//导入学生
export const IMPORT_USER = "IMPORT_USER";
export const IMPORT_USER_success = "IMPORT_USER_success";
//重置密码
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
//搜索学生
export const SEARCH_STUDENT = "SEARCH_STUDENT";
export const SEARCH_STUDENT_SUCCESS = "SEARCH_STUDENT_SUCCESS";
//获取注册用户信息
export const FETCH_REGISTER_DATA = "FETCH_REGISTER_DATA";
export const FETCH_REGISTER_DATA_SUCCESS = "FETCH_REGISTER_DATA_SUCCESS";
//用户授权
export const AGREE_REGISTER = "AGREE_REGISTER";
export const AGREE_REGISTER_SUCCESS = "AGREE_REGISTER_SUCCESS";
//删除注册用户
export const DELETE_REGISTER_USER = "DELETE_REGISTER_USER";
export const DELETE_REGISTER_USER_SUCCESS = "DELETE_REGISTER_USER_SUCCESS";
//获取学习资料
export const FETCH_ADMIN_RESOURCE_DATA = "FETCH_ADMIN_RESOURCE_DATA";
export const FETCH_ADMIN_RESOURCE_DATA_SUCCESS = "FETCH_ADMIN_RESOURCE_DATA_SUCCESS";
//删除学习资料
export const DELETE_RESOURCE_DATA = "DELETE_RESOURCE_DATA";
export const DELETE_RESOURCE_DATA_SUCCESS = "DELETE_RESOURCE_DATA_SUCCESS";
//获取软件
export const FETCH_ADMIN_SOFTWARE_DATA = "FETCH_ADMIN_SOFTWARE_DATA";
export const FETCH_ADMIN_SOFTWARE_DATA_SUCCESS = "FETCH_ADMIN_SOFTWARE_DATA_SUCCESS";
//删除软件按
export const DELETE_SOFTWARE_DATA = "DELETE_SOFTWARE_DATA";
export const DELETE_SOFTWARE_DATA_SUCCESS = "DELETE_SOFTWARE_DATA_SUCCESS";
//搜索学习资料
export const SEARCH_RESOURCE_DATA = "SEARCH_RESOURCE_DATA";
export const SEARCH_RESOURCE_DATA_SUCCESS = "SEARCH_RESOURCE_DATA_SUCCESS";
//搜索软件资料
export const SEARCH_SOFTWARE_DATA = "SEARCH_SOFTWARE_DATA";
export const SEARCH_SOFTWARE_DATA_SUCCESS = "SEARCH_SOFTWARE_DATA_SUCCESS";
//导入学习资料
export const IMPORT_RESOURCE = "IMPORT_RESOURCE";
export const IMPORT_RESOURCE_SUCCESS = "IMPORT_RESOURCE_SUCCESS";
//导入软件
export const IMPORT_SOFTWARE = "IMPORT_SOFTWARE";
export const IMPORT_SOFTWARE_SUCCESS = "IMPORT_SOFTWARE_SUCCESS";

//访问量
export const COUNTER = "COUNTER";
export const COUNTER_SUCCESS = "COUNTER_SUCCESS";
//获取系统参数
export const FETCH_PARAM = 'FETCH_PARAM';
export const FETCH_PARAM_SUCCESS = 'FETCH_PARAM_SUCCESS'
//设置系统参数
export const MODIFY_PARAM = 'MODIFY_PARAM';
export const MODIFY_PARAM_SUCCESS = 'MODIFY_PARAM_SUCCESS'

//morning
//老师请求实验课程
export const TEACHER_QUERY_COURSE = "TEACHER_QUERY_COURSE";
export const TEACHER_QUERY_COURSE_SUCCESS = "TEACHER_QUERY_COURSE_SUCCESS";
//老师查看选课学生
export const TEACHER_CHECK_STUDENT = "TEACHER_CHECK_STUDENT";
export const TEACHER_CHECK_STUDENT_SUCCESS = "TEACHER_CHECK_STUDENT_SUCCESS";

//学生添加上机课程
export const STUDENT_ADD_COURSE = "STUDENT_ADD_COURSE";
export const STUDENT_ADD_COURSE_SUCCESS = "STUDENT_ADD_COURSE_SUCCESS";
//老师添加上机课程
export const TEACHER_ADD_COURSE = "TEACHER_ADD_COURSE";
export const TEACHER_ADD_COURSE_SUCCESS = "TEACHER_ADD_COURSE_SUCCESS";
//学生删除课程
export const STUDENT_DELETE_COURSE = "STUDENT_DELETE_COURSE";
export const STUDENT_DELETE_COURSE_SUCCESS = "STUDENT_DELETE_COURSE_SUCCESS";
//老师删除课程
export const TEACHER_DELETE_COURSE = "TEACHER_DELETE_COURSE";
export const TEACHER_DELETE_COURSE_SUCCESS = "TEACHER_DELETE_COURSE_SUCCESS";
//老师添加教学班课程备注
export const TEACHER_ADD_REMARK = "TEACHER_ADD_REMARK";
export const TEACHER_ADD_REMARK_SUCCESS = "TEACHER_ADD_REMARK_SUCCESS";

//老师学生查看自己的上机任务
export const QUERY_MY_COURSE = "QUERY_MY_COURSE";
export const QUERY_MY_COURSE_SUCCESS = "QUERY_MY_COURSE_SUCCESS";
//老师发布任务
export const TEACHER_RELEASE_TASKS = "TEACHER_RELEASE_TASKS";
export const TEACHER_RELEASE_TASKS_SUCCESS = "TEACHER_RELEASE_TASKS_SUCCESS";
export const TEACHER_RELEASE_TASKS_FAILED = "TEACHER_RELEASE_TASKS_FAILED";
//老师删除任务
export const TEACHER_DELETE_TASK = "TEACHER_DELETE_TASK";
export const TEACHER_DELETE_TASK_SUCCESS = "TEACHER_DELETE_TASK_SUCCESS";
//老师开启/关闭任务作业的上传
export const TEACHER_TOGGLE_TASK_UPLOAD = "TEACHER_TOGGLE_TASK_UPLOAD";
export const TEACHER_TOGGLE_TASK_UPLOAD_SUCCESS = "TEACHER_TOGGLE_TASK_UPLOAD_SUCCESS";
//老师查看学生作业
export const TEACHER_QUERY_SUBMIT = "TEACHER_QUERY_SUBMIT";
export const TEACHER_QUERY_SUBMIT_SUCCESS = "TEACHER_QUERY_SUBMIT_SUCCESS";
//老师查看未提交作业名单
export const TEACHER_QUERY_UNSUBMIT = "TEACHER_QUERY_UNSUBMIT";
export const TEACHER_QUERY_UNSUBMIT_SUCCESS = "TEACHER_QUERY_UNSUBMIT_SUCCESS";
//学生上传作业
export const STUDENT_UPLOAD_HOMEWORK = "STUDENT_UPLOAD_HOMEWORK";
export const STUDENT_UPLOAD_HOMEWORK_SUCCESS = "STUDENT_UPLOAD_HOMEWORK_SUCCESS";
export const STUDENT_UPLOAD_HOMEWORK_FAILED = "STUDENT_UPLOAD_HOMEWORK_FAILED";
//学生查看作业
export const STUDENT_QUERY_SUBMIT = "STUDENT_QUERY_SUBMIT";
export const STUDENT_QUERY_SUBMIT_SUCCESS = "STUDENT_QUERY_SUBMIT_SUCCESS";
//学生删除已提交作业
export const STUDENT_DELETE_HOMEWORK = "STUDENT_DELETE_HOMEWORK";
export const STUDENT_DELETE_HOMEWORK_SUCCESS = "STUDENT_DELETE_HOMEWORK_SUCCESS";
//老师修改任务
export const TEACHER_UPDATE_TASK = "TEACHER_UPDATE_TASK";
export const TEACHER_UPDATE_TASK_SUCCESS = "TEACHER_UPDATE_TASK_SUCCESS";
export const TEACHER_UPDATE_TASK_FAILED = "TEACHER_UPDATE_TASK_FAILED";
//老师批量下载作业
export const TEACHER_DOWNLOAD_SUBMIT = "TEACHER_DOWNLOAD_SUBMIT";
export const TEACHER_DOWNLOAD_SUBMIT_SUCCESS = "TEACHER_DOWNLOAD_SUBMIT_SUCCESS";
//老师删除选课学生
export const TEACHER_DELETE_STUDENT = "TEACHER_DELETE_STUDENT";
export const TEACHER_DELETE_STUDENT_SUCCESS = "TEACHER_DELETE_STUDENT_SUCCESS";

//老师为学生添加课程
export const TEACHER_ADD_STUDENT = "TEACHER_ADD_STUDENT";
export const TEACHER_ADD_STUDENT_SUCCESS = "TEACHER_ADD_STUDENT_SUCCESS";



//管理员

//管理员的实验课程页面
export const ADMIN_QUERY_LABCOURSE = "ADMIN_QUERY_LABCOURSE";
export const ADMIN_QUERY_LABCOURSE_SUCCESS = "ADMIN_QUERY_LABCOURSE_SUCCESS";
//管理员清除作业产生压缩包
export const ADMIN_CLEAR_DATA = "ADMIN_CLEAR_DATA";
//管理员发布公告
export const ADMIN_RELEASE_ANNOUNCE = "ADMIN_RELEASE_ANNOUNCE";
export const ADMIN_RELEASE_ANNOUNCE_SUCCESS = "ADMIN_RELEASE_ANNOUNCE_SUCCESS";
//删除公告
export const ADMIN_DELETE_ANNOUNCE = "ADMIN_DELETE_ANNOUNCE";
export const ADMIN_DELETE_ANNOUNCE_SUCCESS = "ADMIN_DELETE_ANNOUNCE_SUCCESS";
//编辑公告
export const ADMIN_EDIT_ANNOUNCE = "ADMIN_EDIT_ANNOUNCE";
export const ADMIN_EDIT_ANNOUNCE_SUCCESS = "ADMIN_EDIT_ANNOUNCE_SUCCESS";
//添加课程
export const ADMIN_ADD_LABCOURSE = "ADMIN_ADD_LABCOURSE";
export const ADMIN_ADD_LABCOURSE_SUCCESS = "ADMIN_ADD_LABCOURSE_SUCCESS";
//删除课程
export const ADMIN_DELETE_LABCOURSE = "ADMIN_DELETE_LABCOURSE";
export const ADMIN_DELETE_LABCOURSE_SUCCESS = "ADMIN_DELETE_LABCOURSE_SUCCESS";
//导入
export const ADMIN_IMPORT_LABCOURSE = "ADMIN_IMPORT_LABCOURSE";
export const ADMIN_IMPORT_LABCOURSE_SUCCESS = "ADMIN_IMPORT_LABCOURSE_SUCCESS";
//更新
export const ADMIN_UPDATE_LABCOURSE = "ADMIN_UPDATE_LABCOURSE";
export const ADMIN_UPDATE_LABCOURSE_SUCCESS = "ADMIN_UPDATE_LABCOURSE_SUCCESS";
//学生课程
export const ADMIN_QUERY_STUDENTCOURSE = "ADMIN_QUERY_STUDENTCOURSE";
export const ADMIN_QUERY_STUDENTCOURSE_SUCCESS = "ADMIN_QUERY_STUDENTCOURSE_SUCCESS";
//删除学生课程
export const DELETE_STUDENTCOURSE = "ADMIN_DELETE_STUDENTCOURSE";
export const DELETE_STUDENTCOURSE_SUCCESS = "ADMIN_DELETE_STUDENTCOURSE_SUCCESS";

//管理员删除教师课程
export const ADMIN_DELETE_TEACHERCOURSES = "ADMIN_DELETE_TEACHERCOURSES";
export const ADMIN_DELETE_TEACHERCOURSES_SUCCESS = "ADMIN_DELETE_TEACHERCOURSES_SUCCESS";

