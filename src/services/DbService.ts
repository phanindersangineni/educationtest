import { BehaviorSubject, Observable } from 'rxjs';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})

export class DbService {
    private storage: SQLiteObject;
    songsList = new BehaviorSubject([]);
    private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
    records = new BehaviorSubject([]);
    ispresent = new BehaviorSubject([]);

    constructor(
        private platform: Platform,
        private sqlite: SQLite,
    ) {
        this.platform.ready().then(() => {
            this.sqlite.create({
                name: 'neet.db',
                location: 'default'
            })
                .then((db: SQLiteObject) => {
                    this.storage = db;
                   // alert("databasecreated");
                });
        });
    }

    dbState() {
        return this.isDbReady.asObservable();
    }

    getRecords(): Observable<any[]> {
        return this.records.asObservable();
    }

    getIsPresent(): Observable<any[]> {
       return this.ispresent.asObservable();
    }

    getAlldownloads(videoId) {
        return this.storage.executeSql('SELECT * FROM offlinevideos where videoId =?', [videoId]).then(res => {
            //alert("fetching");
            let resdata = [];
            if (res.rows.length > 0) {

                for (var i = 0; i < res.rows.length; i++) {
                    let resp = res.rows.item(i);

                    const localdata: any = {
                        facultyName: resp.facultyName,
                        subjectName: resp.subjectName,
                        description: resp.description,
                        base64: resp.base64,
                        topicName: resp.topicName,
                        subVideoId: resp.subVideoId,
                        subtopicName: resp.subtopicName,
                        videoId:resp.videoId
                    }

                    resdata.push(localdata);
                }

            }
            this.records.next(resdata);

        }).catch(e => {
            //alert("error " + JSON.stringify(e))
        });
    }

    createtable(): Promise<any> {
        return this.storage.executeSql(`
        CREATE TABLE IF NOT EXISTS offlinevideos (pid INTEGER PRIMARY KEY,videoId INTEGER,facultyName
           TEXT,Subject TEXT,description TEXT,topicName TEXT,subVideoId INTEGER,subtopicName TEXT, base64 TEXT,videosize REAL)
        `, [])
            .then(res => {

            })
            .catch(e => {
                alert("error " + JSON.stringify(e))
            });


    }



    inserttable(vidarry, newBase64): Promise<any> {
       // alert(vidarry.subVideoId);
        return this.storage.executeSql(`
          INSERT INTO offlinevideos (videoId,facultyName,Subject,description,
            topicName,subtopicName,base64,subVideoId,videosize) VALUES ('${vidarry.videoId}','${vidarry.facultyName}',
          '${vidarry.Subject}','${vidarry.description}','${vidarry.topicName}','${vidarry.subtopicName}',
          '${newBase64}','${vidarry.subVideoId}','${vidarry.videosize}')
        `, [])
            .then(res1 => {
               // alert('Row Inserted!');

                this.storage.executeSql('SELECT * FROM offlinevideos where videoId =?', [vidarry.videoId]).then(res => {

                    let resdata = [];
                    if (res.rows.length > 0) {

                        for (var i = 0; i < res.rows.length; i++) {
                            let resp = res.rows.item(i);

                            const localdata: any = {
                                facultyName: resp.facultyName,
                                Subject: resp.Subject,
                                description: resp.description,
                                base64: resp.base64,
                                topicName: resp.topicName,
                                subVideoId: resp.subVideoId,
                                subtopicName: resp.subtopicName,
                                videosize:resp.videosize,
                                videoId: resp.videoId
                            }

                            resdata.push(localdata);
                        }

                    }
                    this.records.next(resdata);


                }).catch(e => {
                    alert("error12 " + JSON.stringify(e))
                });

            }).catch(e => {
                alert("error23 " + JSON.stringify(e))
            });


    }

    getDownlod(id): Promise<any> {
        return this.storage.executeSql('SELECT * FROM offlinevideos WHERE subVideoId = ?', [id]).then(res => {
         //  alert(JSON.stringify(res.rows));
           this.ispresent.next(res.rows);
            return {
                id: res.rows.item(0).id,
                artist_name: res.rows.item(0).artist_name,
                song_name: res.rows.item(0).song_name
            }
        });
    }


    insertdata(artist_name, song_name): any {
        let data = [artist_name, song_name];
        return this.storage.executeSql('INSERT INTO songtable (artist_name, song_name) VALUES (?, ?)', data)
            .then(res => {
                alert("checking");
                alert(JSON.stringify(res));
                return res;
            });
    }

    delete(id,videoId): Promise<any> {
        return this.storage.executeSql('delete FROM offlinevideos WHERE subVideoId = ?', [id]).then(res1 => {
          // alert(JSON.stringify(res.rows));
          this.storage.executeSql('SELECT * FROM offlinevideos where videoId =?', [videoId]).then(res => {

            let resdata = [];
            if (res.rows.length > 0) {

                for (var i = 0; i < res.rows.length; i++) {
                    let resp = res.rows.item(i);

                    const localdata: any = {
                        facultyName: resp.facultyName,
                        Subject: resp.Subject,
                        description: resp.description,
                        base64: resp.base64,
                        topicName: resp.topicName,
                        subVideoId: resp.subVideoId,
                        subtopicName: resp.subtopicName,
                        videosize:resp.videosize,
                        videoId: resp.videoId
                    }

                    resdata.push(localdata);
                }

            }
            this.records.next(resdata);


        }).catch(e => {
            alert("error12 " + JSON.stringify(e))
        });
           
        });
    }

    createOfflinewatchtable(): Promise<any> {
        return this.storage.executeSql(`
        CREATE TABLE IF NOT EXISTS offlinevideowatch (pid INTEGER PRIMARY KEY, subVideoId INTEGER,
            watchtime REAL, totaltime REAL, lefttime REAL)
        `, [])
            .then(res => {

            })
            .catch(e => {
                alert("error " + JSON.stringify(e))
            });


    }

    insertorupdatewatchtable(videoarr):Promise<any> {

        return this.storage.executeSql('SELECT * FROM offlinevideowatch WHERE subVideoId = ?', [videoarr.subVideoId]).then(res => {
            //  alert(JSON.stringify(res.rows));
              //this.ispresent.next(res.rows);
             if(res.rows.length >0){

                this.storage.executeSql(`
                INSERT INTO offlinevideowatch (subVideoId,watchtime,totaltime,lefttime) 
                VALUES ('${videoarr.subVideoId}','${videoarr.watchtime}',
                '${videoarr.totaltime}','${videoarr.lefttime}')
              `, [])
                .then(insertres => {
                    alert("checking");
                    alert(JSON.stringify(insertres));
                   
                }); 
                 

             }else{


             }

              
           });

    }
}