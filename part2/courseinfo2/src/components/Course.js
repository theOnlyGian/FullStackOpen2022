const Course = ({ courses }) => {
    return (
        <div>
            {
                courses.map((course) => {
                    return (
                        <div>
                            <Header course={course} />
                            <Content course={course} />
                            <Total course={course} />
                        </div>
                    )
                })
            }
        </div>
    )
}

const Header = ({ course }) => {
    return (
        <>
            <h1>
                {course.name}
            </h1>
        </>
    )
}

const Content = ({ course }) => {
    const parts = course.parts
    return (
        <div>
            {parts.map((part) => {
                return <Part part={part} />
            })}
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <>
            <p>
                {part.name} {part.exercises}
            </p>
        </>
    )
}

const Total = ({ course }) => {
    const parts = course.parts
    return (
        <div>
            <strong>Total exercises {parts.reduce((currentTotal, part) => {
                currentTotal += part.exercises
                return currentTotal
            }, 0)}
            </strong>
        </div>
    )
}

export default Course