//@ts-ignore
import now from '~build/time'
//@ts-ignore
import {name as name_ci, isPR,isCI} from '~build/ci'
//@ts-ignore
import {name, version,keywords,author,description,license} from '~build/package'
//@ts-ignore
import {sha,abbreviatedSha,author as commitAuthor, authorDate,authorEmail,branch,committerDate,committer,committerEmail,tag,tags,lastTag,github,commitMessage} from '~build/git'

export {
    now as buildTime,
    name,
    version,
    commitMessage,
    sha,
    commitAuthor,
}

// now Date Sat Feb 03 2024 14:20:07 GMT+0100 (Mitteleuropäische Normalzeit)
// name web-app
// version 0.0.0
// keywords Array []
// author <empty string>
// description <empty string>
// license <empty string>

// sha 36df30cc3f011191d5c3035aa22a64afcb8bb956
// abbreviatedSha 36df30cc3f
// author nikita-t1
// authorDate 2024-02-03T14:19:37+01:00
// authorEmail 26936278+nikita-t1@users.noreply.github.com
// branch FETCH_HEAD
// committerDate Sat Feb 3 14:19:37 2024 +0100
// committer nikita-t1
// committerEmail 26936278+nikita-t1@users.noreply.github.com
// tag undefined
// tags Array []
// lastTag undefined
// github https://github.com/feedpulse/web-app
// commitMessage draft: add 'unplugin-info' to the project
// isPR false
// isCI true
// name_ci Netlify CI
