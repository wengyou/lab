import React from "react";
import { connect } from "react-redux";
import "../static/style/search.scss";
import { Input, Select } from 'antd';
import * as resource from "../redux/actionCreators/resource";

const InputGroup = Input.Group;
const { Option } = Select;
const { Search } = Input;
let flag = "teacherName";

const SearchCourse = props => {
    const { handleSearchCourse } = props;
    return(
        <div className="container">
            <InputGroup
                className="search"
                compact
            >
                <Select
                    defaultValue="teacherName"
                    onChange={value => flag = value }
                >
                    <Option value="teacherName">老师姓名</Option>
                    <Option value="course">课程名</Option>
                </Select>
                <Search
                    placeholder="请输入搜索信息"
                    onSearch={(value,e) => handleSearchCourse(
                        flag === "teacherName" ? {
                            page: 1,
                            teacherName: value,
                            course: "",
                            userId: "",
                        } : {
                            page: 1,
                            teacherName: "",
                            course: value,
                            userId: ""
                        }
                    )
                    }
                    enterButton
                />
            </InputGroup>
        </div>
    )
};

export default connect(
    state => ({

    }),
    dispatch => ({
        handleSearchCourse(args) {
            dispatch(resource.fetchSearchCourse(args))
        }
    })
)(SearchCourse)
