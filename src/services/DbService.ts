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

    getAlldownloads() {
        return this.storage.executeSql('SELECT * FROM offlinevideos', []).then(res => {
            //alert("fetching");
            let resdata = [];
            if (res.rows.length > 0) {

                for (var i = 0; i < res.rows.length; i++) {
                    let resp = res.rows.item(i);

                    const localdata: any = {
                        facultyName: resp.facultyName,
                        Subject: resp.Subject,
                        description: resp.description,
                        base64: resp.base64,
                        topicid: resp.topicid,
                        topicName: resp.topicName,
                        subtopicid: resp.subtopicid,
                        subtopicName: resp.subtopicName
                    }

                    resdata.push(localdata);
                }

            }
            this.records.next(resdata);

        }).catch(e => {
            alert("error " + JSON.stringify(e))
        });
    }

    createtable(): Promise<any> {
        return this.storage.executeSql(`
        CREATE TABLE IF NOT EXISTS offlinevideos (pid INTEGER PRIMARY KEY,facultyName
           TEXT,Subject TEXT,description TEXT,topicid TEXT,topicName TEXT,subtopicid INTEGER,subtopicName TEXT, base64 TEXT,videosize INTEGER)
        `, [])
            .then(res => {

            })
            .catch(e => {
                alert("error " + JSON.stringify(e))
            });


    }



    inserttable(vidarry, newBase64): Promise<any> {
        alert(vidarry.subtopicid);
        return this.storage.executeSql(`
          INSERT INTO offlinevideos (facultyName,Subject,description,
            topicName,subtopicName,base64,subtopicid,videosize) VALUES ('${vidarry.facultyName}',
          '${vidarry.Subject}','${vidarry.description}','${vidarry.topicName}','${vidarry.subtopicName}',
          '${newBase64}','${vidarry.subtopicid}','${vidarry.videosize}')
        `, [])
            .then(res1 => {
               // alert('Row Inserted!');

                this.storage.executeSql('SELECT * FROM offlinevideos', []).then(res => {

                    let resdata = [];
                    if (res.rows.length > 0) {

                        for (var i = 0; i < res.rows.length; i++) {
                            let resp = res.rows.item(i);

                            const localdata: any = {
                                facultyName: resp.facultyName,
                                Subject: resp.Subject,
                                description: resp.description,
                                base64: resp.base64,
                                topicid: resp.topicid,
                                topicName: resp.topicName,
                                subtopicid: resp.subtopicid,
                                subtopicName: resp.subtopicName,
                                videosize:resp.videosize
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
        return this.storage.executeSql('SELECT * FROM offlinevideos WHERE subtopicid = ?', [id]).then(res => {
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

    delete(id): Promise<any> {
        return this.storage.executeSql('delete FROM offlinevideos WHERE subtopicid = ?', [id]).then(res => {
          // alert(JSON.stringify(res.rows));
           return{
               res :res.rows
           }
           
        });
    }
}