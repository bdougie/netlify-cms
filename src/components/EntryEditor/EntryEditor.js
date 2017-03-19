import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SplitPane from 'react-split-pane';
import Button from 'react-toolbox/lib/button';
import { ScrollSync, ScrollSyncPane } from '../ScrollSync';
import ControlPane from '../ControlPanel/ControlPane';
import PreviewPane from '../PreviewPane/PreviewPane';
import Toolbar from './EntryEditorToolbar';
import styles from './EntryEditor.css';

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

  showOnlyEditor = () => {
    const {
        collection,
        entry,
        fields,
        fieldsMetaData,
        fieldsErrors,
        getAsset,
        onChange,
        onValidate,
        onAddAsset,
        onRemoveAsset,
        onCancelEdit,
    } = this.props;
    const controlClassName = `${ styles.controlPane } ${ this.state.showEventBlocker && styles.blocker }`;
    return (
      <div className={styles.root}>
        <ScrollSync>
          <div className={styles.container}>
            <ScrollSyncPane>
              <div className={controlClassName}>
                <Button style={{ 'margin-left': '80vw' }} onClick={this.handleTogglePreview}>
                  OPEN PREVIEW
                </Button>
                <ControlPane
                  collection={collection}
                  entry={entry}
                  fields={fields}
                  fieldsMetaData={fieldsMetaData}
                  fieldsErrors={fieldsErrors}
                  getAsset={getAsset}
                  onChange={onChange}
                  onValidate={onValidate}
                  onAddAsset={onAddAsset}
                  onRemoveAsset={onRemoveAsset}
                  ref={c => this.controlPaneRef = c} // eslint-disable-line
                />
              </div>
            </ScrollSyncPane>
          </div>
        </ ScrollSync>
        <div className={styles.footer}>
          <Toolbar
            isPersisting={entry.get('isPersisting')}
            onPersist={this.handleOnPersist}
            onCancelEdit={onCancelEdit}
          />
        </div>

      </div>
    );
  };
  render() {
    const {
        collection,
        entry,
        fields,
        fieldsMetaData,
        fieldsErrors,
        getAsset,
        onChange,
        onValidate,
        onAddAsset,
        onRemoveAsset,
        onCancelEdit,
    } = this.props;
    const controlClassName = `${ styles.controlPane } ${ this.state.showEventBlocker && styles.blocker }`;
    const previewClassName = `${ styles.previewPane } ${ this.state.showEventBlocker && styles.blocker }`;

    if (!this.state.previewOpen) {
      return this.showOnlyEditor();
    }
    return (
      <div className={styles.root}>
        <ScrollSync>
          <div className={styles.container}>
            <SplitPane
              defaultSize="50%"
              onDragStarted={this.handleSplitPaneDragStart}
              onDragFinished={this.handleSplitPaneDragFinished}
            >
              <ScrollSyncPane>
                <div className={controlClassName}>
                  <ControlPane
                    collection={collection}
                    entry={entry}
                    fields={fields}
                    fieldsMetaData={fieldsMetaData}
                    fieldsErrors={fieldsErrors}
                    getAsset={getAsset}
                    onChange={onChange}
                    onValidate={onValidate}
                    onAddAsset={onAddAsset}
                    onRemoveAsset={onRemoveAsset}
                    ref={c => this.controlPaneRef = c} // eslint-disable-line
                  />
                </div>
              </ScrollSyncPane>
              <div className={previewClassName}>
                <Button style={{ 'margin-left': '40vw' }} onClick={this.handleTogglePreview}> CLOSE PREVIEW </Button>
                <PreviewPane
                  collection={collection}
                  entry={entry}
                  fields={fields}
                  fieldsMetaData={fieldsMetaData}
                  getAsset={getAsset}
                />
              </div>
            </SplitPane>
          </div>
        </ ScrollSync>
        <div className={styles.footer}>
          <Toolbar
            isPersisting={entry.get('isPersisting')}
            onPersist={this.handleOnPersist}
            onCancelEdit={onCancelEdit}
          />
        </div>

      </div>
    );
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
