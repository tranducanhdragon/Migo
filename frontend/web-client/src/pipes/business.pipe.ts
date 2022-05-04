import { Injector, Pipe, PipeTransform } from "@angular/core"
import { AppComponentBase } from "src/shared/app-component-base"

@Pipe({
    name: 'stateStorePipe',
  })
  export class StateStorePipe extends AppComponentBase
    implements PipeTransform {
    constructor(injector: Injector) {
      super(injector)
    }
    transform(value?: number): string {
      if (value === null || value === 0) {
        return 'Lỗi thuộc tính'
      } else {
        if (value === 1) return 'Chờ phê duyệt'
        else if (value === 2) return 'Phê duyệt'
        else if (value === 3) return 'Yêu cầu chỉnh sửa'
        else if (value === 4) return 'Ngừng hoạt động'
        else return ''
      }
    }
  }