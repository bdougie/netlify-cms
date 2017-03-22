import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './EntryEditor.css';
import ShowOnlyEditor from './ShowOnlyEditor';
import ShowEditorWithPreview from './ShowEditorWithPreview';

class EntryEditor extends Component {
  state = {
    showEventBlocker: false,
    previewOpen: true,
  };

  handleSplitPaneDragStart = () => {
    this.setState({ showEventBlocker: true });
  };

  handleSplitPaneDragFinished = () => {
    this.setState({ showEventBlocker: false });
  };

  handleOnPersist = () => {
    this.controlPaneRef.validate();
    this.props.onPersist();
  };

  handleTogglePreview = () => {
    const { previewOpen } = this.state;
    this.setState({ previewOpen: !previewOpen });
  };

  render() {
    const controlClassName = `${ styles.controlPane } ${ this.state.showEventBlocker && styles.blocker }`;
    const previewClassName = `${ styles.previewPane } ${ this.state.showEventBlocker && styles.blocker }`;

    return this.state.previewOpen ?
      <ShowEditorWithPreview
        {...this.props}
        styles={styles}
        handleOnPersist={this.handleOnPersist}
        handleTogglePreview={this.handleTogglePreview}
        handleSplitPaneDragStart={this.handleSplitPaneDragStart}
        handleSplitPaneDragFinished={this.handleSplitPaneDragFinished}
        controlClassName={controlClassName}
        previewClassName={previewClassName}
        controlPaneRef={this.controlPaneRef}
      />
    : <ShowOnlyEditor
      {...this.props}
      styles={styles}
      handleOnPersist={this.handleOnPersist}
      handleTogglePreview={this.handleTogglePreview}
      controlClassName={controlClassName}
      controlPaneRef={this.controlPaneRef}
    />;
  }
}

EntryEditor.propTypes = {
  collection: ImmutablePropTypes.map.isRequired,
  entry: ImmutablePropTypes.map.isRequired,
  fields: ImmutablePropTypes.list.isRequired,
  fieldsMetaData: ImmutablePropTypes.map.isRequired,
  fieldsErrors: ImmutablePropTypes.map.isRequired,
  getAsset: PropTypes.func.isRequired,
  onAddAsset: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onPersist: PropTypes.func.isRequired,
  onRemoveAsset: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
};


export default EntryEditor;
