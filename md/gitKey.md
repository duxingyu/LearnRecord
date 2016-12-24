# Git命令

<table>
    <tr>
        <td>1</td>
        <td><code>ssh-keygen -t rsa -C "email"</code></td>
        <td>user/.ssh/id_rsa.pub</td>
    </tr>
    <tr>
        <td>2</td>
        <td><code>git init</code></td>
        <td>初始化</td>
    </tr>
    <tr>
        <td>3</td>
        <td><code>git add file</code></td>
        <td>添加到仓库</td>
    </tr>
    <tr>
        <td>4</td>
        <td><code>git commit -m "message"</code></td>
        <td>提交</td>
    </tr>
    <tr>
        <td>5</td>
        <td><code>git status</code></td>
        <td>工作区状态</td>
    </tr>
    <tr>
        <td>6</td>
        <td><code>git diff file</code></td>
        <td>查看修改内容</td>
    </tr>
    <tr>
        <td>7</td>
        <td><code>git log [--pretty=oneline]</code></td>
        <td>提交日志(可选)</td>
    </tr>
    <tr>
        <td>8</td>
        <td><code>git reset --hard HEAD^(~x/)/num</code></td>
        <td>回退到上一个(x个)/(版本号)版本</td>
    </tr>
    <tr>
        <td>9</td>
        <td><code>git reflog</code></td>
        <td>记录的命令</td>
    </tr>
    <tr>
        <td>10</td>
        <td><code>git checkout -- file</code></td>
        <td>回到最近一次git commit或git add时的状态</td>
    </tr>
    <tr>
        <td>11</td>
        <td><code>git reset HEAD file</code></td>
        <td>把暂存区的修改撤销掉</td>
    </tr>
    <tr>
        <td>12</td>
        <td><code>git remote add origin git@github.com:...git</code></td>
        <td>关联远程库</td>
    </tr>
    <tr>
        <td>13</td>
        <td><code>git push -u origin master</code></td>
        <td>第一次推送</td>
    </tr>
    <tr>
        <td>14</td>
        <td><code>git push origin master</code></td>
        <td>推送</td>
    </tr>
    <tr>
        <td>15</td>
        <td><code>git clone</code></td>
        <td>克隆</td>
    </tr>
    <tr>
        <td>16</td>
        <td><code>git checkout -b bra</code></td>
        <td>创建分支并切换</td>
    </tr>
    <tr>
        <td>17</td>
        <td><code>git branch (bra)</code></td>
        <td>查看(创建)分支(*)</td>
    </tr>
    <tr>
        <td>18</td>
        <td><code>git merge (--no-ff -m "") bra</code></td>
        <td>合并分支</td>
    </tr>
    <tr>
        <td>19</td>
        <td><code>git branch -d bra</code></td>
        <td>删除指定分支</td>
    </tr>
    <tr>
        <td>20</td>
        <td><code>git log --graph --pretty=oneline --abbrev-commit</code></td>
        <td>查看分支历史</td>
    </tr>
    <tr>
        <td>21</td>
        <td><code>git stash</code></td>
        <td>bug分支</td>
    </tr>
</table>