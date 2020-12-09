import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'sing-in', pathMatch: 'full' },
	
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'sing-in',
    loadChildren: () => import('./sing-in/sing-in.module').then( m => m.SingInPageModule)
  },
  {
    path: 'sing-up',
    loadChildren: () => import('./sing-up/sing-up.module').then( m => m.SingUpPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'downloads',
    loadChildren: () => import('./downloads/downloads.module').then( m => m.DownloadsPageModule)
  },
  {
    path: 'playvideo',
    loadChildren: () => import('./playvideo/playvideo.module').then( m => m.PlayvideoPageModule)
  },
  {
    path: 'offlinevideo',
    loadChildren: () => import('./offlinevideo/offlinevideo.module').then( m => m.OfflinevideoPageModule)
  },
  {
    path: 'videos',
    loadChildren: () => import('./videos/videos.module').then( m => m.VideosPageModule)
  },
  {
    path: 'syllabus',
    loadChildren: () => import('./syllabus/syllabus.module').then( m => m.SyllabusPageModule)
  },
  {
    path: 'subjectexam',
    loadChildren: () => import('./subjectexam/subjectexam.module').then( m => m.SubjectexamPageModule)
  },
  {
    path: 'examstart',
    loadChildren: () => import('./examstart/examstart.module').then( m => m.ExamstartPageModule)
  },
  {
    path: 'syllabus-topics',
    loadChildren: () => import('./syllabus-topics/syllabus-topics.module').then( m => m.SyllabusTopicsPageModule)
  },
  {
    path: 'calender',
    loadChildren: () => import('./calender/calender.module').then( m => m.CalenderPageModule)
  },
  {
    path: 'tests',
    loadChildren: () => import('./tests/tests.module').then( m => m.TestsPageModule)
  },
  {
    path: 'question',
    loadChildren: () => import('./question/question.module').then( m => m.QuestionPageModule)
  },
  {
    path: 'test-result',
    loadChildren: () => import('./test-result/test-result.module').then( m => m.TestResultPageModule)
  },
  {
    path: 'viewresult',
    loadChildren: () => import('./view-result/viewresult.module').then( m => m.ViewResultPageModule)
  },
  {
    path: 'students',
    loadChildren: () => import('./students/students.module').then( m => m.StudentsPageModule)
  },

  {
    path: 'examlist',
    loadChildren: () => import('./examlist/examlist.module').then( m => m.ExamlistPageModule)
  },
  {
    path: 'examanswers',
    loadChildren: () => import('./examanswers/examanswers.module').then( m => m.ExamanswersPageModule)
  },
  {
    path: 'uploadedsheets',
    loadChildren: () => import('./uploadedsheets/uploadedsheets.module').then( m => m.UploadedsheetsPageModule)
  },


  {
    path: 'uploads',
    loadChildren: () => import('./uploads/uploads.module').then( m => m.UploadsPageModule)
  },

  {
    path: 'imageview',
    loadChildren: () => import('./imageview/imageview.module').then( m => m.ImageViewPageModule)
  },
  
  
  {
    path: 'insight',
    loadChildren: () => import('./insight/insight.module').then( m => m.InsightPageModule)
  },
  {
    path: 'about-academy',
    loadChildren: () => import('./about-academy/about-academy.module').then( m => m.AboutAcademyPageModule)
  },
  {
    path: 'faculties',
    loadChildren: () => import('./faculties/faculties.module').then( m => m.FacultiesPageModule)
  },
  {
    path: 'faculties-messages-list',
    loadChildren: () => import('./faculties-messages-list/faculties-messages-list.module').then( m => m.FacultiesMessagesListPageModule)
  },
  {
    path: 'faculties-message',
    loadChildren: () => import('./faculties-message/faculties-message.module').then( m => m.FacultiesMessagePageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'leaderboard',
    loadChildren: () => import('./leaderboard/leaderboard.module').then( m => m.LeaderboardPageModule)
  },
  {
    path: 'change-language',
    loadChildren: () => import('./change-language/change-language.module').then( m => m.ChangeLanguagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
