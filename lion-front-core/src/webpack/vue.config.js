let glob = require('glob')

function handleEntry() {
    let entries = {}
    glob.sync('./src/**/*.html').forEach(item => {
        let entryTemplate = item.split('/').splice(item.split('/').length*-1+1)
        entries[entryTemplate[entryTemplate.length-2]] = {
            entry:  item.replace('.html','') + '.ts',
            template:  item,
            filename: item.replace('./src/','')
        }
    })
    return entries
}

exports.pages = handleEntry