// Functions and interfaces for api calls to the dnevnik

export interface Student {
    firstName: string   ,
    lastName: string ,
    surName: string ,
    className: string ,
    orgName: string ,
    id: string ,
    avatarId: string ,
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
    endMinute: number,
    homework: Homework | undefined,
    grades: number[] | undefined
}

export interface DaySchedule {
    date: string,
    weekdayName: string,
    lessons: Lesson[]
}

export interface Homework {
    id: string,
    isDone: boolean,
    lessonName: string,
    lessonNumber: number,
    startTime: Date,
    endTime: Date,
    lessonId: string,
    description: string,
    isHomeworkElectronicForm: boolean,
}

export interface GradesResponse {
    grades: number[],
    lessonNumber: number,
    date: string
}

// Don't question it
export async function queryGrades(token: string, studentId: string, date: string):Promise<GradesResponse[]> {
    let resp = await queryEndpoint(`/estimate?studentId=${studentId}&date=${date}`, token);
    let ret:GradesResponse[] = [];
    for (let day of resp.weekGradesTable.days) {
        for (let grade of day.lessonGrades) {
            ret.push({grades: grade.grades, lessonNumber:grade.sequenceNumber, date: day.date.split('T')[0]})
        }
    }

    return ret;
}

export async function queryHomework(token: string, studentId: string, date: string | undefined): Promise<Homework[]> {
    let endpoint = `/homework?studentId=${studentId}` + (date != undefined ? `&date=${date}` : "");
    const resp = await queryEndpoint(endpoint, token);
    let hw: Homework[] = [];
    for (let w of resp.homeworks) {
        hw.push(w);
    }
    return hw;
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
