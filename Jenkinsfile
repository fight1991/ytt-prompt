pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                nodejs('NodeJS 16 LTS')  {
                    sh "npm ci"
                    sh "npm run createApi"
                }
            }
        }
        stage('apis') {
            steps {
                nodejs('NodeJS 16 LTS') {
                    sh "npm run createApi"
                }
            }
        }
        stage('publish') {
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
                        uploadFile: "dist/es/ytt-apis-${packageJSONVersion}",
                        wrapAsMultipart: false
                    )
                }

            }
        }
    }
}
