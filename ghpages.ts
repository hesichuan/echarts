// import chalk from "chalk";

const dayjs = require('dayjs')
const ghpages = require('gh-pages')
const chalk = require('chalk')

const simpleGit = require('simple-git')
const git = simpleGit()

const getCurBranch = async () => {
  const branchInfo = await git.branch()

  const repo = 'https://github.com/tosenBill/echarts.git'

  console.log(chalk.green('正在发布至远程仓库...'))
  
  ghpages.publish(
    'dist',
    {
      dest: 'dist',
      branch: 'gh-pages',
      repo
    },
    (err) => {
      const date = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
      if (err) {
        console.error(err, date)
        return
      }
      console.log(chalk.green(`已发布至'${branchInfo.current}'分支：`, repo))
      console.log(chalk.green('发布时间:', date))
      // console.log(`发布complete：${repo}`);
      // console.log(`发布时间：${date}`);
    }
  )
}

getCurBranch()
