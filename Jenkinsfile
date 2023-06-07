pipeline {
    agent any
    parameters {
        string(name: 'YAPI_TOKEN', defaultValue: '', description: '项目token配置')
    }
    stages {
        stage('Building') {
            steps {
                script {
                    if (params.YAPI_TOKEN == '') {
                        error('YAPI_TOKEN is required!')
                    }
                }
                nodejs('NodeJS 16 LTS')  {
                    sh "npm ci"
                }
            }
        }
        stage('Creating') {
            steps {
                nodejs('NodeJS 16 LTS') {
                    sh "npm run createApi --token=$YAPI_TOKEN"
                }
            }
        }
        stage('Publish') {
            steps {
                script {
                    def packageJSON = readJSON file: 'package.json'
                    def packageJSONVersion = packageJSON.version
                    echo "${packageJSONVersion}"
                    httpRequest(
                        url: "https://nexus.maxtropy.cloud/repository/npm/@maxtropy/ytt-apis-${packageJSONVersion}",
                        httpMode: 'PUT',
                        authentication: 'nexus-maxtropy',
                        responseHandle: 'NONE',
                        uploadFile: "dist/es",
                        wrapAsMultipart: false
                    )
                }

            }
        }
    }
}
