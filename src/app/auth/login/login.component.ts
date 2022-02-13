import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
// import { io, Socket } from 'socket.io-client';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})

export class NgxLoginComponent extends NbLoginComponent {
      hide: boolean=true;
      showPwd(){
        this.hide=!this.hide;
      }
//   socket: any;
//   data1:any;
//   ngOnInit(){
//     console.log("hihi");
    
//     this.socket = io('http://apinewlook.mehtaindia.co.in', { transports : ['websocket'] });
//   this.socket.on('FromAPI',(data:any)=>{
//     this.data1=data;
//     console.log(this.data1);
//   })
// }
  }

