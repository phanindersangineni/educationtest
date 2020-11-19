import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VideoService {
  private base64: any;
  private examhr:any;
  private totalmarks:any;
  private examname:any;
  private examId:any;
  private subjectId:any;
  private videourl:any;
  private topicId:any;
  private subtopicId:any;
  private subExamSecId:any;

  get getsubExamSecId(){
    return this.subExamSecId;
  }

  set setsubExamSecId(subExamSecId:string){
    this.subExamSecId =subExamSecId;
  }

  get getTopicId(){
    return this.topicId;
  }
  set setTopicId(topicId:string){
    this.topicId =topicId;
  }

  set setSubTopicId(subtopicId:string){
    this.subtopicId = subtopicId;
  }

  get getSubTopicId(){
   return this.subtopicId;
  }
   
  get getVideoUrl(){
    return this.videourl;
  }

  get getSubjectId() {
    return this.subjectId;
  }

  set setVideoUrl(videourl:string){
    this.videourl =videourl;
  }

  set setSubjectId(subjectId:string){
    this.subjectId =subjectId;
  }
  
  get getbase64String() {
    return this.base64;
  }

  set setbase64String(base64: string) {
    this.base64 = base64;
  }

  get getexamHr() {
    return this.examhr
  }

  set setExamHr(examhr: string) {
    this.examhr =examhr;
  }

  get gettotalMarks() {
    return this.totalmarks;
  }

  set settotalMarks(totalmarks:string) {
  this.totalmarks =totalmarks;
  }

  set setexamName(examname:string) {
    this.examname =examname;
    
  }

  get getexamName(){
    return this.examname;
  }

  set setExamId(examId:string){
    this.examId =examId;
  }

  get getExamId(){
    return this.examId;
  }
  
}