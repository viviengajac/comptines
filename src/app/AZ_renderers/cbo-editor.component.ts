import { Component,ViewChild,ViewContainerRef,AfterViewInit } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
//import { ICellEditorParams } from 'ag-grid-community';
import { Cbo,ItemCbo } from '../AZ_common/cbo.model';
import { GlobalConstantes } from '../AZ_common/global_cst';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-cbo-editor',
  template: `
<select (change)="changeEvent($event)">
	<option *ngFor="let item of m_vals" value="{{item.m_id}}" class="{{m_classe_fonte}}" [selected]="item.m_selected==true">{{item.m_lib}}</option>
</select>`
})
//<button (click)="onCliquerHREF($event)">Href</button>
export class CboEditorComponent implements ICellEditorAngularComp,AfterViewInit
{
	public m_id:number;
//	public m_options:ItemCbo[];
	public m_classe_fonte:string;
//	public params;
	public m_vals:ItemCbo[];
	public m_nom_table:string;
@ViewChild('input', { read: ViewContainerRef }) public input;
	agInit(params): void
	{
//		this.params = params;
		this.m_vals=params.colDef.cellEditorParams.m_liste_items.m_liste_items;
		this.m_nom_table=params.colDef.cellEditorParams.m_nom_table;
console.log('cbo-editor-component.agInit: m_vals='+this.m_vals.values+'nom_table='+this.m_nom_table);
//console.log('CboEditorComponent.agInit: params='+params+', params.data='+params.data+', params.data.type='+params.data.type+', params.value='+params.value);
//console.log('*** CboEditorComponent: agInit: classe de params='+params.constructor.name+', value='+params.value);
//console.log('agInit de cboeditorcomponent: voir params');
//console.log(params);
//console.log('voir data');
//console.log(params.data);
//console.log('voir coldef');
//console.log(params.colDef.field);
//console.log('voir params.api.coldef');
//console.log(params.api.alignedGridsService.columnController.columnDefs);
/*
		var nom_col_cle_primaire:string=params.api.alignedGridsService.columnController.columnDefs[1].field;
		var nom_champ:string=params.colDef.field;
		var num_lig:number=params.node.chlidIndex;
		var req:string=params.context.componentParent.PersonnaliserComboBox(nom_col_cle_primaire,num_lig,nom_champ);
console.log('req='+req);
		if(req.length>0)
		{
			/ *
			var fini:boolean=false;
			this.m_vals=params.context.componentParent.InitCbo(req)
			.then(
			res=>
			{
				this.m_vals=params.context.componentParent.m_cbo_tmp;
				fini=true;
			}
			);
			while(!fini)
			{
				this.delay(50);
			}
			* /
		}
		else
		{
//			this.m_vals=
		}
console.log('voici m_vals');
console.log(this.m_vals);
//console.log(params.colDef);
//console.log(params.m_liste_items);
//console.log(params.m_liste_items.length);
*/
		this.m_id=params.value;
		var nb_items=this.m_vals.length;
		var i:number;
		for(i=0;i<nb_items;i++)
		{
		console.log('this.m_vals[i].m_id='+this.m_vals[i].m_id);
			if(this.m_vals[i].m_id==this.m_id)
				this.m_vals[i].m_selected=true;
		}
console.log('CboEditorComponent:agInit: m_id='+this.m_id);
//console.log('m_vals');
//console.log(this.m_vals);
//console.log('CboEditorComponent:agInit: nb items='+params.m_liste_items.length);
//console.log('CboEditorComponent: bis='+params.colDef.cellEditorParams.m_liste_items.length);
//console.log(params.colDef);
		this.m_classe_fonte=params.colDef.cellClass;
	}
	refresh(parametres?: any): boolean
	{
//console.log('refresh de cboeditorcomponent: voir parametres');
//console.log(parametres);
		return true;
	}
	changeEvent(event)
	{
		// Return date object
//		console.log(event.target.value);
//console.log('changeEvent de cboeditorcomponent: voir event');
//console.log(event);
		this.m_id=event.target.value;
//console.log('CboEditorComponent: m_id='+this.m_id);
	}
	delay(ms: number)
	{
		return new Promise( resolve => setTimeout(resolve, ms) );
	}
	getValue()
	{
		return this.m_id;
	}
	isCancelAfterEnd(): boolean
	{
		return false;
	}
	ngAfterViewInit()
	{
    // window.setTimeout(() => {
    //   this.input.element.nativeElement.focus();
    // });
	}
	onCliquerHREF($event)
	{
//console.log('onCliquer HREF ('+this.m_nom_table+','+this.m_id+')');
		var num_fonte=GlobalConstantes.NumClasseFonte(GlobalConstantes.m_classe_fonte);
		var num_ecran=MenuComponent.NumEcran(this.m_nom_table);
		if(num_ecran.length>0)
		{
			var params_url:string='?p='+GlobalConstantes.m_id_prs+'|'+num_ecran+'|'+this.m_id+'|'+num_fonte;
//console.log('cbo_editor: params_url='+params_url);
/*
//		url = this.router.serializeUrl(this.router.createUrlTree(['/example']));
//console.log('base url='+window.location+' ou '+window.location.origin+' ou '+window.location.href+' ou '+window.location.pathname);
			var url1:string=window.location.href;
			var url2:string=window.location.origin;
			var adresse:string=url1.substring(url2.length);
			var url:string=url1;
			var idx:number=adresse.indexOf('/');
			if(idx>0)
			{
				url=url2+adresse.substring(0,idx);
			}
			url+=params_url;
*/
			var url:string=GlobalConstantes.m_url+params_url;
//console.log('cbo_editor: url='+url);
			window.open(url,'_blank');
		}
/*
		if (this.params.onClick instanceof Function)
		{
//console.log('test passé');
			// put anything into params u want pass into parents component
			const parametres =
			{
				event: $event,
				detail: this.params.node.data
				// ...something
			}
//console.log('avant appel');
			this.params.onClick(parametres);
//console.log('apres appel');
		}
*/
	}
}