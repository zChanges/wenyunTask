/**
 * 待处理任务返回数据
 */
export interface waitTaskInfo{
    /**
     *  验收完成时间
     */
    acceptFinish: number | string;
    /**
     * 创建时间
     */
    createData: number | string;
    /**
     * 创建用户id
     */
    createUserId: number;
    /**
     * 创建用户名称
     */
    createUserName: string;
    /**
     * 描述
     */
    description: string;
    /**
     * 联调时间
     */
    devFinish: number | string;
    /**
     * 文件id
     */
    fileId: number;
    /**
     * 编号
     */
    id: number;
    /**
     * 手机号码
     */
    mobilePhone: string;
    /**
     * 产品id
     */
    productId: number;
    /**
     * 项目id
     */
    projectId: number;
    relationTaskid: number;
    roleId: number;
    /**
     * 任务状态列表
     */
    taskUserList: [any];
    /**
     * 测试完成时间
     */
    testFinish: number | string;
    /**
     * 测试开始时间
     */
    testStart: number | string;
    /**
     * 标题
     */
    title: string;
    /**
     * 当前状态id 102:开发 108:联调 103:测试 105:产品 106:关闭
     */
    todoStatusId: number | string;
    /**
     * 当前状态str
     */
    todoStatusStr: string;
    /**
     * 当前用户id
     */
    todoUserId: number; 
    /**
     * 当前用户名称
     */
    todoUserName: string;
    /**
     * 类型 200:需求 201:BUG
     */
    type: number | string;
    /**
     * 用户名称
     */
    userName: string;
    /**
     * 版本id
     */
    versionId: number;
    /**
     * webid登陆后获取到
     */
    webId: number;
    /**
     * 工作量
     */
    workLoad: number;
}