

function ResumeCard(resume) {
    console.log(resume.resume.description)
  return (
    <div className="experianceCard">
        <h1>{resume.resume.name}</h1>
        <p>{resume.resume.description}</p>
        <h4>{resume.resume.position} {"("}{resume.resume.startTime} - {resume.resume.endTime}{")"}</h4>
        <p>Work - Javascript, React, Typescript</p>
    </div>
  )
}

export default ResumeCard