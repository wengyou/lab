import { fromJS,  } from "immutable";
import * as constants from "../../constants/actionTypes";
import {STUDENT_UPLOAD_HOMEWORK_FAILED} from "../../constants/actionTypes";

const defaultState = fromJS({
    taskTotal: " ",
    courseTotal: "",
    submitTotal: "",
    downloadUrl: "",
    courseTask: [],
    taskResource: {},
    myCourse: [],
    allCourse: [],
    unsubmitList: [],
    submitList: [],
    checkList : [],
    teacherUploadFlag: false,
    studentUploadFlag: false,
    teacherUpdateFlag: false,
});
export default (state = defaultState, action) => {
    //那个游客也可见的课程页面，并用于学生添加课程
    switch (action.type) {
        case constants.QUERY_COURSE_RES_SUCCESS:
            return state.merge({
                taskTotal: action.payload.total,
                courseResource: action.payload.items
            });
        case constants.QUERY_COURSE_TASK_SUCCESS:
            let obj = {};
            obj[action.teacherCourseId] = action.payload;
            console.log(action.courseTask);
            let newObj = Object.assign(obj,action.courseTask);
            return state.set(
                "courseTask", newObj,
            );
        case constants.QUERY_MY_COURSE_SUCCESS:
            return state.set(
                "myCourse", action.payload
            );
        case constants.TEACHER_QUERY_COURSE_SUCCESS:
            return state.merge({
                allCourse: action.payload.items,
                courseTotal: action.payload.total,
            });
        case constants.STUDENT_QUERY_SUBMIT_SUCCESS:
            return state.set(
                "checkList", action.payload
            );
        case constants.TEACHER_QUERY_UNSUBMIT_SUCCESS:
            return state.set(
                "unsubmitList", action.payload
            );
        case constants.TEACHER_QUERY_SUBMIT_SUCCESS:
            return state.merge({
                submitTotal: action.payload.total,
                submitList: action.payload.items
            });
        case constants.TEACHER_DOWNLOAD_SUBMIT_SUCCESS:
            return state.set(
                "downloadUrl", action.payload
            );
            //修改store
            //学生删除课程
        case constants.STUDENT_DELETE_COURSE_SUCCESS:
            const myCourseRes_S = state.toJS().myCourse;
            const courseResourceRes_S = state.toJS().courseResource;
            const myCourseArr_S = [];
            myCourseRes_S.map((e)=>(
                myCourseArr_S.push(e.studentCourseId)
              ));
            courseResourceRes_S.map((e)=>{
                if(e.teacherCourseId === action.teacherCourseId){
                    e.added = !e.added;
                }
            });
             const myCourseIndex_S = myCourseArr_S.indexOf(action.studentCourseId);
            myCourseRes_S.splice(myCourseIndex_S, 1);
            return state.merge({
                myCourse: myCourseRes_S,
                courseResource: courseResourceRes_S
            });
            //学生删除作业
        case constants.STUDENT_DELETE_HOMEWORK_SUCCESS:
            let checkListRes = state.toJS().checkList;
            console.log(checkListRes);
            const checkListSearch = action.payload;
            console.log(checkListRes, checkListSearch);
            let checkListArr = [];
            checkListRes.map((e)=>(
                checkListArr.push(e.id)
            ));
            const checkListIndex = checkListArr.indexOf(checkListSearch);
            checkListRes.splice(checkListIndex, 1);
            return state.set(
                "checkList", checkListRes
            );
            //老师删除课程后
        case constants.TEACHER_DELETE_COURSE_SUCCESS:
            const myCourseRes_T = state.toJS().myCourse;
            const allCourseRes_T = state.toJS().allCourse;
            let myCourseArr_T = [];
            myCourseRes_T.map((e)=>(
                myCourseArr_T.push(e.courseId)
            ));
            allCourseRes_T.map((e) => {
                if(e.id === action.payload){
                    e.added = !e.added;
                }
            });
            const myCourseIndex_T = myCourseArr_T.indexOf(action.payload);
            myCourseRes_T.splice(myCourseIndex_T, 1);
            return state.merge({
                myCourse: myCourseRes_T,
                allCourse: allCourseRes_T
            });
            //老师删除任务后
        case constants.TEACHER_DELETE_TASK_SUCCESS:
            let teacherDeleteTask = state.toJS().courseTask;
            let deleteIndex = teacherDeleteTask[action.teacherCourseId].map((item, index)=>{
                if(item.id === action.taskId){
                    return index;
                }
            });
            teacherDeleteTask[action.teacherCourseId].splice(deleteIndex, 1);
            return state.set(
                "courseTask", teacherDeleteTask
            );

            //学生添加课程
        case constants.STUDENT_ADD_COURSE_SUCCESS:
            const courseResourceRes = state.toJS().courseResource;
            const newCourseResource = courseResourceRes.map((e)=>{
                    if(e.teacherCourseId === action.payload){
                        e.added = !e.added;
                    }
                    return e;
                });
            return state.set(
                "courseResource", newCourseResource
            );
            //老师添加课程后：
        case constants.TEACHER_ADD_COURSE_SUCCESS:
            const allCourseRes = state.toJS().allCourse;
            allCourseRes.map((e) => {
                if(e.id === action.payload){
                    e.added = !e.added;
                }
            });
            return state.set(
                "allCourse", allCourseRes
            );

            //remark改变后
        case constants.TEACHER_ADD_REMARK_SUCCESS:
            let myCourseRes = state.toJS().myCourse;
            let teacherCourseId1 = action.payload.teacherCourseId;
            let remark = action.payload.remark;
            let myCourseList = myCourseRes.map((e)=>{
                if(e.teacherCourseId === teacherCourseId1)
                     e.remark = remark ;
                return e;
            });
            return state.set(
                "myCourse", myCourseList
            );
            //开启上传下载作业！
        case constants.TEACHER_TOGGLE_TASK_UPLOAD_SUCCESS:
            let toggleCourseTask = state.toJS().courseTask;
                toggleCourseTask[action.teacherCourseId].map((e)=>{
                if(e.id === action.taskId){
                    e.closed = !e.closed;
                    return e;
                }
            });
            return state.set(
                "courseTask",toggleCourseTask
            );
            //老师发布任务后，任务动态显示在列表在
        case constants.TEACHER_RELEASE_TASKS_SUCCESS:
            const releaseTask = state.toJS().courseTask;
            const teacherUploadFlag = state.toJS().teacherUploadFlag;
            releaseTask[action.teacherCourseId] = action.payload;
            return state.merge({
                courseTask: releaseTask,
                teacherUploadFlag: !teacherUploadFlag,
            });
            //老师发布任务失败
        case constants.TEACHER_RELEASE_TASKS_FAILED:
            const teacherUploadFlag2 = state.toJS().teacherUploadFlag;
            return state.set(
                "teacherUploadFlag",!teacherUploadFlag2
            );
            //老师修改任务后，任务变化
        case constants.TEACHER_UPDATE_TASK_SUCCESS:
            const updateTask =  state.toJS().courseTask;
            const teacherUpdateFlag = state.toJS().teacherUpdateFlag;
            updateTask[action.teacherCourseId] = action.payload;
            return state.merge({
                courseTask: updateTask,
                teacherUpdateFlag: !teacherUpdateFlag
            });
            //老师修改任务失败
        case constants.TEACHER_UPDATE_TASK_FAILED:
            const teacherUpdateFlag2 = state.toJS().teacherUpdateFlag;
            return state.set(
                "teacherUpdateFlag", !teacherUpdateFlag2
            );
            //学生上传任务成功,学生上传任务失败
        case constants.STUDENT_UPLOAD_HOMEWORK_SUCCESS:
        case STUDENT_UPLOAD_HOMEWORK_FAILED:

            const studentUploadFlag = state.toJS().studentUploadFlag;
            return state.set(
                "studentUploadFlag", !studentUploadFlag
            );
            //搜索课程
        case constants.FETCH_SEARCH_COURSE_SUCCESS:
            return state.merge({
                taskTotal: action.payload.total,
                courseResource: action.payload.items
            });
        default:
            return state;
    }
}
