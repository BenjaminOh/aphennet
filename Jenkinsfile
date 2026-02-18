pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                script {
                    def remote = [:]
                    remote.name = 'Production Server'
                    remote.host = '172.17.0.1' // Docker 호스트 IP (또는 실제 서버 IP)
                    remote.user = 'root' // 서버 접속 계정
                    remote.allowAnyHosts = true
                    
                    // Jenkins Credentials ID (SSH Key)
                    // Jenkins 관리 > Credentials에서 등록한 ID를 입력하세요
                    withCredentials([sshUserPrivateKey(credentialsId: 'deploy-key', keyFileVariable: 'IDENTITY_FILE', usernameVariable: 'USER')]) {
                        remote.identityFile = IDENTITY_FILE
                        
                        if (env.BRANCH_NAME == 'main') {
                            echo "🚀 Deploying to Production (main branch)..."
                            sshCommand remote: remote, command: """
                                cd /home/aphennet
                                git fetch --all
                                git reset --hard origin/main
                                chmod +x deploy.sh
                                ./deploy.sh
                            """
                        } 
                        else if (env.BRANCH_NAME == 'develop') {
                            echo "Rx Deploying to Develop (develop branch)..."
                            sshCommand remote: remote, command: """
                                cd /home/aphennet-dev
                                git fetch --all
                                git reset --hard origin/develop
                                chmod +x deploy.sh
                                ./deploy.sh
                            """
                        }
                        else {
                            echo "Skipping deployment for branch: ${env.BRANCH_NAME}"
                        }
                    }
                }
            }
        }
    }

    
    post {
        success {
            echo "✅ Deployment Successful!"
            mail to: 'ohsjwe@gmail.com',
                 from: 'Aphennet <noreply@tmanager.kr>',
                 subject: "✅ Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: """
Build Successful!
Project: ${env.JOB_NAME}
Build Number: #${env.BUILD_NUMBER}
Branch: ${env.BRANCH_NAME}
Build URL: ${env.BUILD_URL}
"""
        }
        failure {
            echo "❌ Deployment Failed!"
            mail to: 'ohsjwe@gmail.com',
                 from: 'Aphennet <noreply@tmanager.kr>',
                 subject: "❌ Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: """
Build Failed!
Project: ${env.JOB_NAME}
Build Number: #${env.BUILD_NUMBER}
Branch: ${env.BRANCH_NAME}
Build URL: ${env.BUILD_URL}
Check console output for details.
"""
        }
    }
}
