const tokens = {
    admin: 'admin-token',
    editor: 'editor-token'
}

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}

export default [
    {
        url: '/api/vue-admin-template/user/login',
        type: 'post',
        timeout: 1000,
        response: config => {
            const { account } = config.body
            const token = tokens[account]

            console.log(token)
            // mock error
            if (!token) {
                return {
                    code: 500,
                    success: false,
                    message: 'Account and password are incorrect.'
                }
            }

            return {
                code: 200,
                success: true,
                data: {
                    token,
                    name: 'Super Admin'
                }
            }
        }
    },
    // get user info
    {
        url: '/api/vue-admin-template/user/info',
        type: 'get',
        response: config => {
            const { token } = config.query
            const info = users[token]
            console.log(info)
            // mock error
            if (!info) {
                return {
                    code: 500,
                    message: 'token失效，请重新登录'
                }
            }

            return {
                code: 200,
                data: info
            }
        }
    },

    // user logout
    {
        url: '/api/vue-admin-template/user/logout',
        type: 'post',
        response: _ => ({
            code: 200,
            data: 'success'
        })
    }
]
