import React from 'react';
import SplitPane from 'react-split-pane';
import Button from 'react-toolbox/lib/button';
import { ScrollSync, ScrollSyncPane } from '../ScrollSync';
import Toolbar from './EntryEditorToolbar';
import ControlPane from '../ControlPanel/ControlPane';
import PreviewPane from '../PreviewPane/PreviewPane';

const ShowEditorWithPreview = ({
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
  controlPaneRef,
  previewClassName,
  controlClassName,
  styles,
  handleTogglePreview,
  handleOnPersist,
  handleSplitPaneDragStart,
  handleSplitPaneDragFinished,
}) => (
  <div className={styles.root}>
    <ScrollSync>
      <div className={styles.container}>
        <SplitPane
          defaultSize="50%"
          onDragStarted={handleSplitPaneDragStart}
          onDragFinished={handleSplitPaneDragFinished}
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
                ref={c => controlPaneRef = c}
              />
            </div>
          </ScrollSyncPane>
          <div className={previewClassName}>
            <Button style={{ 'margin-left': '35vw' }} onClick={handleTogglePreview}> CLOSE PREVIEW </Button>
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
        onPersist={handleOnPersist}
        onCancelEdit={onCancelEdit}
      />
    </div>

  </div>
  );

export default ShowEditorWithPreview;
