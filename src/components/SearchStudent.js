import React, {useRef, useState} from "react";
import { connect } from "react-redux";
import "../static/style/search.scss";
import { Input, Select } from 'antd';
import * as resource from "../redux/actionCreators/resource";


const InputGroup = Input.Group;
const { Option } = Select;
const { Search } = Input;
let flag = "userId";

const SearchStudent = props => {
    const { handleSearchStudent } = props;
    return(
        <div className="searchStudentWrapper">
            <InputGroup
                className="search"
                compact
            >
                <Select
                    defaultValue="userId"
                    onChange={
                        (value) => {
                            flag = value
                        }
                    }
                >
                    <Option value="userId">学号</Option>
                    <Option value="useName">姓名</Option>
                </Select>
                <Search
                    className="studentSearch"
                    placeholder="请输入搜索信息"
                    enterButton
                    onSearch={
                        (value, e) => {
                            handleSearchStudent(
                                flag === "userId" ?
                                    {
                                        page: 1,
                                        type: "student",
                                        userId: value,
                                        userName: ""
                                    } :{
                                        page: 1,
                                        type: "student",
                                        userId: "",
                                        userName: value
                                    })
                        }
                    }
                />
            </InputGroup>
        </div>
    )

};
export default connect(
    state => ({

    }),
    dispatch => ({
        handleSearchStudent(args){
            dispatch(resource.fetchStudentMes(args))
        }
    })
)(SearchStudent)