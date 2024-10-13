// Functions and interfaces for api calls to the dnevnik

export interface Student {
    firstName: string,
    lastName: string,
    surName: string,
    className: string,
    orgName: string,
    id: string,
    avatarId: string
}

export interface Lesson {
    id: string,
    lessonid: string,
    lessonName: string,
    groupName: string,
    room: string,
    number: number,
    beginHour: number,
    beginMinute: number,
    endHour: number,
    endMinute: number
}

export interface DaySchedule {
    date: Date,
    weekdayName: string,
    lessons: Lesson[]
}

export async function querySchedule(token: string, studentId: string):Promise<DaySchedule[]> {
    const resp = await queryEndpoint(`/schedule?studentId=${studentId}`, token);
    let schedule: DaySchedule[] = [];
    for (let day of resp.scheduleModel.days) {
        schedule.push({ 
            date: day.date,
            weekdayName: day.dayOfWeekName,
            lessons: day.scheduleDayLessonModels
        })
    }
    return schedule;
}

export async function queryStudent(token: string): Promise<Student> {
    const resp = await queryEndpoint("/students", token);
    const student: Student = resp.students[0];
    return student;
}

async function queryEndpoint(endpoint: string, token: string): Promise<any> {
    let resp = await fetch(`https://dnevnik.egov66.ru/api${endpoint}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Cookie': `Aiss2Auth=Bearer%20${token}`
        },
    })
    return await resp.json()
}
