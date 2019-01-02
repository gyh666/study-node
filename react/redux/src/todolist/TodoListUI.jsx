import React/* , { Component } */ from 'react';
import { Input, Button, Tag, List, Alert } from 'antd';

const TodoListUI = (props) => {
	return (
		<div>
			<Input placeholder="请输入内容" onChange={props.handleInputChange} value={props.inputValue} />
			<Button type="primary" onClick={props.handleButtonSubmit}>
				提交
			</Button>
			<Alert
				style={{ width: 330, margin: '10px 0 0 20px', display: 'none' }}
				message="Error"
				type="error"
				showIcon
			/>
			<div style={{ margin: 20 }}>
				<Tag color="#87d068">评论列表展示：</Tag>
				{/* <ul>{this.getItem()}</ul> */}
				<List
					bordered
					style={{ marginTop: 10, width: 500 }}
					dataSource={props.list}
					renderItem={(item, index) => (
						<List.Item
							onClick={() => {
								props.handleDelete(index);
							}}
						>
							{item}
						</List.Item>
					)}
				/>
			</div>
		</div>
	);
};

export default TodoListUI;

// export default class TodoListUI extends Component {
//   render() {
//     return (
//       <div>
// 				<Input placeholder="请输入内容" onChange={this.props.handleInputChange} value={this.props.inputValue} />
// 				<Button type="primary" onClick={this.props.handleButtonSubmit}>
// 					提交
// 				</Button>
// 				<Alert
// 					ref="alert"
// 					style={{ width: 330, margin: '10px 0 0 20px', display: 'none' }}
// 					message="Error"
// 					type="error"
// 					showIcon
// 				/>
// 				<div style={{ margin: 20 }}>
// 					<Tag color="#87d068">评论列表展示：</Tag>
// 					{/* <ul>{this.getItem()}</ul> */}
// 					<List
// 						bordered
// 						style={{ marginTop: 10, width: 500 }}
// 						dataSource={this.props.list}
// 						renderItem={(item, index) => (
// 							<List.Item onClick={(index) => {this.props.handleDelete(index)}}>{item}</List.Item>
// 						)}
// 					/>
// 				</div>
// 			</div>
//     )
//   }
// }
