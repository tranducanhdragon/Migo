import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value?: number, ...args: unknown[]): unknown {
    if(value == 1){
        return 'Quản trị'
    }
    else if(value == 2){
        return 'Người dùng'
    }
    else{
        return 'Không có'
    }
  }

}