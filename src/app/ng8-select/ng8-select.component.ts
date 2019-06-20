import { Component, OnInit, Input, Output, ViewChild, ElementRef, forwardRef, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Ng8SelectService } from '../ng8-select.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'ng8-select',
  templateUrl: './ng8-select.component.html',
  styleUrls: ['./ng8-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Ng8SelectComponent),
      multi: true
    }
  ]
})
export class Ng8SelectComponent implements OnInit, OnDestroy {

  @Input() public name: any; // 标识对应option的select组件名
  @Input() public placeholder = '-请选择'; // 用来接收传入的placeholder
  @Input() public selectValueAndName = '10'; // 保存需要获取的下拉列表的value和需要显示name
  @Input() public disabled = false; // 禁用选择
  @Input()
  set optionList(optionList: any) { // 保存下拉列表
    if (this.selectValueAndName && optionList) {
      this.resetOptionList(optionList); // 重置下拉选择列表
    }
  }
   get optionList(): any { return this._optionList; }

  public _optionList: any = []; // 临时保存下拉列表
  public isShowOption = false; // 是否显示下拉列表
  public isShowOptionUP = false; // （当触发下拉的列表处于窗口底部时，启用向上弹出样式）
  public selectValue = ''; // 显示选择的列表值
  public viewSelectName = ''; // 保存对应value值，需要在视图显示的名称
  public obFn: any; // 保存订阅者，用来在组件销毁时，取消订阅

  private onChangeCallback: any = {}; // 选择值变化的回调函数
  private onTouchedCallback: any = {}; // 触发组件时的回调函数

  @ViewChild('mdbselect', {static: false}) mDBSelect: ElementRef; // 注册为angularDOM元素

  constructor(
    private ng8SelectService: Ng8SelectService,
  ) { }

  ngOnInit() {
    // 接收选择下拉列表的值，过滤出事件流，筛选出对应name值的select组件，进行赋值
    this.obFn = this.ng8SelectService.getMySelectOptionState().pipe(filter(item=>item.optionName === this.name)).subscribe(v=> {
      if (!this.name) {
        // tslint:disable-next-line:no-string-throw
        throw ('The "name" attribute of component "db-select" is required');
      } else {
        this.getValueToName(v.selectValue);
      }
    });

    document.addEventListener('mousedown', (e: any) => {
      this.isCloseOptionList(e);
    });

  }

  ngOnDestroy() {
    document.removeEventListener('mousedown', (e: any) => {
      this.isCloseOptionList(e);
    });

    this.obFn.unsubscribe();
  }

  // 判断点击组件外围时，隐藏下拉列表
  isCloseOptionList(e) {


     if (e.target.className !== 'm-db-select-option' && e.target.className!=='m-db-option showAnimation') {
       this.isShowOption = false;
     }
    //  if(e.target.class){}

  }


  // 点击文本框，弹出下拉列表
  clickIsShowSelect(e) {
    // console.log(e.clientY);
    this.isShowOption = true; // 显示列表

    if (e.clientY > 430 && this.optionList.length > 10) { // 根据点击组件的位置，判断使用哪种弹出样式
      this.isShowOptionUP = true;
    } else {
      this.isShowOptionUP = false;
    }

    this.onTouchedCallback();
    this.sendSelectItemToList(this.selectValue); // 如果存在选择值，则向下拉列表中传递值
  }

  // 转换下拉列表为数组格式
  resetOptionList(optionList){
    optionList.forEach(element => { // 遍历下拉列表
      // tslint:disable-next-line:prefer-const
      let elementArray = []; // 声明一个空数组，用来接收转换过的列表数据
      // tslint:disable-next-line:forin
      for (const key in element) {
        elementArray.push(element[key]); // 将每个对象的转换为数组存储
      }
      // 如果存在传入值selectValueAndName，则根据selectValueAndName的值为新字段赋值
      if(typeof this.selectValueAndName==='string'&&this.selectValueAndName.length===2) {
        element['mSelectValue'] = elementArray[this.selectValueAndName[0]]; // 添加mSelectValue字段
        element['mSelectName'] = elementArray[this.selectValueAndName[1]]; // 添加mSelectName字段
      }
      
    });
    
    this._optionList = optionList; // 保存下拉列表
  }

  // 获取选择的value，用来转换为选择值对应的name
  getValueToName(v) {

    if (v !== undefined && this.optionList.length > 0) {
      
      this.onChangeCallback(v); // 调用变更方法
      this.selectValue = v; // 保存选择值
      this.getSelectValueToName(v); // 根据选择value值，获取对应的name
      this.isShowOption = false;
    } else {
      this.isShowOption = true;
    }
    
  }

  // 获取选择值对应的要显示的名称
  getSelectValueToName(value: any) {
    if (value === undefined) { return; }
    this.viewSelectName = ''; // 重置视图显示的名称为空
    this.optionList.forEach(element => { // 遍历列表
      // 保存对应value值的名称
      if (element.mSelectValue === value) { this.viewSelectName = element.mSelectName; }
    });

  }


  // 写入选择的值
  writeValue(v) {
    if(v === undefined) {
      this.viewSelectName = '';
      this.selectValue = '';
      this.sendSelectItemToList(''); // 如果存在选择值，则向下拉列表中传递值
      return;
    }
    this.selectValue = v; // 保存选择的值
    this.getSelectValueToName(v); // 获取选择值对应的要显示的名称
  }

  // 注册变更事件
  registerOnChange(fn) {
    this.onChangeCallback = fn;
  }

  // 注册touch事件
  registerOnTouched(fn) {
    this.onTouchedCallback = fn;
  }

  // 发送值到下拉列表，用来显示已选择的列表项
  sendSelectItemToList(value) {
    let param = {optionName:this.name, selectValue: value};
    this.ng8SelectService.sendShowSelectItemSubject(param); // 发送值
  }

}
