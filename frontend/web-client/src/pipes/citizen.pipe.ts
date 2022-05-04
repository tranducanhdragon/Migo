import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value?: number, ...args: unknown[]): unknown {
    if (value == 0) {
      return 'Nữ'
    }
    else if (value == 1) {
      return 'Nam'
    }
    else if (value == 2) {
      return 'Khác'
    }
    else {
      return 'Không có'
    }
  }

}

@Pipe({
  name: 'workstatus'
})
export class WorkStatusPipe implements PipeTransform {

  transform(value?: number, ...args: unknown[]): unknown {

    if (value == 0) {
      return 'Nghỉ hưu'
    }
    else if (value == 1) {
      return 'Không có'
    }
    else if (value == 2) {
      return 'Lãnh đạo quản lý'
    }
    else if (value == 3) {
      return 'Nhà chuyên môn bậc cao'
    }
    else if (value == 4) {
      return 'Nhà chuyên môn bậc trung'
    }
    else if (value == 5) {
      return 'Nhân viên trợ lý'
    }
    else if (value == 6) {
      return 'Nhân viên dịch vụ'
    }
    else if (value == 7) {
      return 'Lao động có kỹ năng'
    }
    else if (value == 8) {
      return 'Lao động thủ công'
    }
    else if (value == 9) {
      return 'Thợ lắp ráp, vận hành'
    }
    else if (value == 10) {
      return 'Lao động giản đơn'
    }
    else if (value == 11) {
      return 'Lực lượng vũ trang'
    }
    else if (value == 12){
      return 'Khác'
    }
    else{
      return 'Khác'
    }
  }
}