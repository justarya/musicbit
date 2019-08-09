function checkWords(kalimat){
    let kalimatStr = kalimat
    let dictionary = ['fuck','shit', 'cunt', 'bitch','nigger','nigga','niga','whore','penis','sex','vagina','marijuana','porn','tits','boobs']
    let splitted = kalimatStr.split(' ')
    let flag = false
    for(let i = 0; i < splitted.length;i++){
        for(let j = 0; j < dictionary.length;j++){
            if(splitted[i] === dictionary[j]){
                flag = true
            }
        }
    }
    let result;
        if(flag){
            result = 'peace of mind'
        } else {
            result = kalimatStr
        }

        return result
}



module.exports = checkWords;

