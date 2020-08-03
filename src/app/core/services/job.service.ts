import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Job} from '../../model/job.interface';
import {JobReq} from '../../model/job-req.interface';

@Injectable({
    providedIn: 'root'
})
export class JobService {
    private readonly LOCAL_HOST: string = 'http://localhost:8080';

    constructor(private http: HttpClient) {
    }

    public createJob(jobContent: Job, image: File, userId: number): Observable<any> {
        const formData = new FormData();
        const blobOverrides = new Blob([JSON.stringify(jobContent)], {
            type: 'application/json',
        });
        formData.append('file', image, 'file');
        formData.append('job', blobOverrides, 'job');
        console.log(formData);

        return this.http.post<any>(this.LOCAL_HOST + `/users/${userId}/jobs`, formData);
    }

    public getAllJobsWithPagination(jobReq: JobReq): Observable<Job[]> {
        return this.http.get<Job[]>(this.LOCAL_HOST + '/jobs', {
            params: {
                distinct: jobReq.distinct,
                page: jobReq.page,
                sort: jobReq.sort,
                size: jobReq.size,
                categoryId: jobReq.categoryId || ''
            }
        });
    }

    public getAllJobsBySellerId(id: number): Observable<Job[]> {
        return this.http.get<Job[]>(this.LOCAL_HOST + `/users/${id}/jobs`);
    }

    public getJobById(id: number): Observable<Job> {
        return this.http.get<Job>(this.LOCAL_HOST + `/jobs/${id}`);
    }
}
