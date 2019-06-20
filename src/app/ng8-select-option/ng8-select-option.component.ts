import { Component, OnInit,Input,Output, OnDestroy } from '@angular/core';
import { Ng8SelectService } from '../ng8-select.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ng8-select-option',
  templateUrl: './ng8-select-option.component.html',
  styleUrls: ['./ng8-select-option.component.scss']
})
export class Ng8SelectOptionComponent implements OnInit, OnDestroy {

  public isShow = false; // 是否显示下拉列表
  public obFn: any; // 用于保存接收值的方法
  public isShowSelectStatus = false; // 是否显示选中状态
  public alreadySelectValue: any; // 保存已选择的值

  @Input() public ngValue = ''; // 显示字段
  @Input() public name; // 标识与select对应的option组件名

  constructor(
    private ng8SelectService: Ng8SelectService
  ) { }

  ngOnInit() {
    
    // 接收选择下拉列表的值，过滤出事件流，筛选出对应name值的select组件，进行赋值
    this.obFn = this.ng8SelectService.getShowSelectItemSubject().pipe(filter(item => item.optionName === this.name)).subscribe(v => {
      if (v.selectValue == this.ngValue) { // 如果选择值与列表显示值相等，则列表显示选择状态
        this.alreadySelectValue = v.selectValue;
        this.isShowSelectStatus = true;
      } else {
        this.isShowSelectStatus = false;
        this.alreadySelectValue = '';
      }
    });
    

   }

   ngOnDestroy() {
     this.obFn.unsubscribe();// 组件销毁时，清除订阅
   }

   // 获取选择的selectValue
   getSelectValue (value:any) {
     
     // tslint:disable-next-line:quotemark
     if (!this.name) throw("The 'name' attribute of component 'db-select-option' is required");
     
    //  if(value === this.alreadySelectValue) return;
     // 接收文本框传递来的参数，用来判断是否显示下拉列表
     let param = {optionName: this.name, selectValue:value};
     this.ng8SelectService.sendMySelectOptionState(param);

   }

}
