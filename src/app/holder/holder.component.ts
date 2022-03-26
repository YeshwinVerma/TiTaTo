import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-holder',
  templateUrl: './holder.component.html',
  styleUrls: ['./holder.component.scss']
})
export class HolderComponent{
  @Input() turn:string = "";
  @Input() currentMovePlayerName:string = "";
  @Input() values:Array<string> = ["-","-","-","-","-","-","-","-","-"];
  
  @Output() changeTurn:EventEmitter<string> = new EventEmitter();
  @Output() changeBoard:EventEmitter<Array<string>> = new EventEmitter();

  emitEventEmitter(value:string):void{
      this.changeTurn.emit(value);
  }

  changeValue(data:{id:number,value:string}):void{
    if(this.turn != "player") return;
    let temp = this.values;
    temp[data.id] = data.value;
    this.changeBoard.emit(temp);
    this.changeTurn.emit("ai")
  }

}
