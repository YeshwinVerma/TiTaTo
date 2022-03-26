import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent{
 
 @Input() value:string = "-";
 @Input() id:number = 0;

 @Output() changeValue:EventEmitter<{id:number,value:string}> = new EventEmitter();

 click():void{ 
  if (this.value!="-") return;
    this.changeValue.emit({id:this.id, value:"X"})
 }

}
