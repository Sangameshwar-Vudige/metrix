const koreskills_logic=(data)=>{
    const keys=Object.keys(data).filter((e)=>data[e]===true)
    return keys
}

const otherskills_logic=(data)=>{
    const skills=data.split(',').map((e)=>e.trim())
    return skills
}

module.exports={
    koreskills_logic:koreskills_logic,
    otherskills_logic:otherskills_logic,
}